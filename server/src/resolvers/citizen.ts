import { FieldError } from "./fieldError";
import { Citizen } from "../entities/citizen";
import { CitizenInfo } from "../entities/citizenInfo";
import { MyContext } from "../types";
import argon2 from "argon2";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";

@InputType()
class CitizenInput {
  @Field()
  cnic: string;

  @Field()
  password: string;
}

@ObjectType()
class CitizenResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Citizen, { nullable: true })
  citizen?: Citizen;
}

@Resolver()
export class CitizenResolver {
  @Query(() => Citizen, { nullable: true })
  Citizen(
    @Arg("cnic", () => String) cnic: string
  ): Promise<Citizen | undefined> {
    return Citizen.findOne(cnic);
  }

  @Query(() => [Citizen])
  Citizens(): Promise<Citizen[]> {
    return Citizen.find();
  }

  @Mutation(() => CitizenResponse)
  async citizenRegister(
    @Arg("options") options: CitizenInput,
    @Ctx() { req, redis }: MyContext
  ): Promise<CitizenResponse> {
    const info = await CitizenInfo.findOne(options.cnic);
    if (info === undefined) {
      return {
        errors: [{ field: "cnic", message: "invalid cnic" }],
      };
    }
    if ((await Citizen.findOne(options.cnic)) !== undefined) {
      return {
        errors: [{ field: "cnic", message: "Citizen already registered" }],
      };
    }
    const hash = await argon2.hash(options.password);
    const citizen = await Citizen.create({
      cnic: options.cnic,
      password: hash,
      info,
    }).save();
    req.session.citizenCnic = citizen.cnic;
    await redis.set("me", citizen.cnic);
    return { citizen };
  }

  @Mutation(() => CitizenResponse)
  async citizenLogin(
    @Arg("options") options: CitizenInput,
    @Ctx() { req, redis }: MyContext
  ): Promise<CitizenResponse> {
    const citizen = await Citizen.findOne(options.cnic);
    if (citizen === undefined) {
      return {
        errors: [{ field: "cnic", message: "Citizen not registered" }],
      };
    }
    if (!(await argon2.verify(citizen.password, options.password))) {
      return {
        errors: [{ field: "password", message: "Incorrect password" }],
      };
    }
    req.session.citizenCnic = citizen.cnic;
    await redis.set("me", citizen.cnic);
    citizen.updatedAt = new Date();
    await citizen.save();
    return { citizen };
  }

  @Mutation(() => Boolean)
  async citizenLogout(@Ctx() { req, res, redis }: MyContext): Promise<boolean> {
    res.clearCookie("vacc");
    redis.del("me");
    return new Promise((resolve) =>
      req.session.destroy((err) => resolve(!err))
    );
  }

  @Mutation(() => Citizen, { nullable: true })
  async citizenMe(@Ctx() { redis }: MyContext): Promise<Citizen | null> {
    const cnic = await redis.get("me");
    if (!cnic) return null;
    // console.log(
    //   'req.session.citizenCnic === redis.get("me") = ',
    //   req.session.citizenCnic === cnic
    // );
    const citizen = await Citizen.findOneOrFail(cnic);
    await citizen.firstAppointment?.center;
    await citizen.secondAppointment?.center;
    return citizen;
  }

  @Query(() => Citizen, { nullable: true })
  async citizenMeQuery(@Ctx() { redis }: MyContext): Promise<Citizen | null> {
    const cnic = await redis.get("me");
    // console.log(
    //   'req.session.citizenCnic === redis.get("me") = ',
    //   req.session.citizenCnic === cnic
    // );
    return cnic ? await Citizen.findOneOrFail(cnic) : null;
  }

  @Mutation(() => Boolean)
  async citizenDeregister(
    @Arg("cnic") cnic: string,
    @Ctx() { req, res, redis }: MyContext
  ): Promise<boolean> {
    const citizen = await Citizen.findOne(cnic);
    if (citizen === undefined) {
      return false;
    }
    citizen?.remove();
    res.clearCookie("vacc");
    redis.del("me");
    return new Promise((resolve) =>
      req.session.destroy((err) => resolve(!err))
    );
  }

  @Mutation(() => CitizenResponse)
  async cardInfo(@Arg("cnic") cnic: string): Promise<CitizenResponse> {
    const citizen = await Citizen.findOne(cnic);
    if (citizen === undefined) {
      return {
        errors: [{ field: "cnic", message: "Citizen not registered" }],
      };
    }
    await citizen.firstAppointment?.center;
    await citizen.secondAppointment?.center;
    return { citizen };
  }

  @Mutation(() => CitizenResponse)
  async verify(@Arg("id", () => Int) id: number): Promise<CitizenResponse> {
    const citizen = await Citizen.findOne(undefined, {
      where: [{ firstAppointment: id }, { secondAppointment: id }],
    });
    if (citizen === undefined) {
      return {
        errors: [{ field: "id", message: "invalid appointment id" }],
      };
    }
    await citizen.firstAppointment?.center;
    await citizen.secondAppointment?.center;
    return { citizen };
  }
}
