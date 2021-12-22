import { FieldError } from "./fieldError";
import { Worker } from "../entities/worker";
import argon2 from "argon2";
import { MyContext } from "src/types";
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
class WorkerInput {
  @Field()
  username: string;

  @Field()
  password: string;
}

@ObjectType()
class WorkerResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Worker, { nullable: true })
  worker?: Worker;
}

@Resolver()
export class WorkerResolver {
  @Query(() => Worker, { nullable: true })
  worker(@Arg("id", () => Int) id: number): Promise<Worker | undefined> {
    return Worker.findOne(id);
  }

  @Query(() => [Worker])
  workers(): Promise<Worker[]> {
    return Worker.find();
  }

  @Mutation(() => WorkerResponse)
  async registerWorker(
    @Arg("options") { username, password }: WorkerInput
  ): Promise<WorkerResponse> {
    if ((await Worker.findByUsername(username)) !== undefined) {
      return {
        errors: [{ field: "username", message: "That user already exists" }],
      };
    }
    const hash = await argon2.hash(password);
    return {
      worker: await Worker.create({
        username: username,
        password: hash,
      }).save(),
    };
  }

  @Mutation(() => WorkerResponse)
  async workerLogin(
    @Arg("options") { username, password }: WorkerInput,
    @Ctx() { redis }: MyContext
  ): Promise<WorkerResponse> {
    const worker = await Worker.findByUsername(username);
    if (worker === undefined) {
      return {
        errors: [{ field: "username", message: "That user does not exist" }],
      };
    }
    if (!(await argon2.verify(worker.password, password))) {
      return {
        errors: [{ field: "password", message: "Incorrect password" }],
      };
    }
    await redis.set("me-worker", worker.username);
    worker.updatedAt = new Date();
    await worker.save();
    return { worker };
  }

  @Mutation(() => Boolean)
  async workerLogout(@Ctx() { req, res, redis }: MyContext): Promise<boolean> {
    res.clearCookie("vacc");
    redis.del("me-worker");
    return new Promise((resolve) =>
      req.session.destroy((err) => resolve(!err))
    );
  }

  @Query(() => Worker, { nullable: true })
  async workerMeQuery(@Ctx() { redis }: MyContext): Promise<Worker | null> {
    const cnic = await redis.get("me-worker");
    return cnic ? await Worker.findOneOrFail(cnic) : null;
  }
}
