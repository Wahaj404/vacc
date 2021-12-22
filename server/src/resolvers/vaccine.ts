import { FieldError } from "./fieldError";
import { Vaccine } from "../entities/vaccine";
import {
  Arg,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";

@InputType()
class VaccineInput {
  @Field()
  name: string;

  @Field()
  doseCount: number;
}

@ObjectType()
class VaccineResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Vaccine, { nullable: true })
  vaccine?: Vaccine;
}

@Resolver()
export class VaccineResolver {
  @Mutation(() => VaccineResponse)
  async createVaccine(
    @Arg("vaccine") options: VaccineInput
  ): Promise<VaccineResponse> {
    if ((await Vaccine.findByName(options.name)) !== undefined) {
      return {
        errors: [
          { field: "name", message: "a vaccine of that name already exists" },
        ],
      };
    }
    if (options.doseCount < 0) {
      return {
        errors: [
          { field: "doseCount", message: "dose count can not be negative" },
        ],
      };
    }
    return { vaccine: await Vaccine.create(options).save() };
  }

  @Mutation(() => VaccineResponse)
  async updateVaccine(
    @Arg("vaccine") { doseCount, name }: VaccineInput
  ): Promise<VaccineResponse> {
    const vaccine = await Vaccine.findByName(name);
    if (vaccine === undefined) {
      return {
        errors: [{ field: "name", message: "no such vaccine" }],
      };
    }
    if (doseCount < 0) {
      return {
        errors: [
          { field: "doseCount", message: "dose count can not be negative" },
        ],
      };
    }
    vaccine.doseCount = doseCount;
    return { vaccine: await vaccine.save() };
  }

  @Mutation(() => VaccineResponse)
  async deleteVaccine(@Arg("name") name: string): Promise<VaccineResponse> {
    const vaccine = await Vaccine.findByName(name);
    if (vaccine === undefined) {
      return {
        errors: [{ field: "name", message: "no such vaccine" }],
      };
    }
    await vaccine.remove();
    return { vaccine };
  }

  @Query(() => [Vaccine])
  async vaccines(): Promise<Vaccine[]> {
    return await Vaccine.find({});
  }
}
