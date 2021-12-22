import { FieldError } from "./fieldError";
import { CitizenInfo } from "../entities/citizenInfo";
import {
  Arg,
  Field,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Resolver,
} from "type-graphql";

@InputType()
class CitizenInfoInput {
  @Field()
  cnic: string;

  @Field()
  name: string;

  @Field(() => Int)
  age: number;
}

@ObjectType()
class CitizenInfoResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => CitizenInfo, { nullable: true })
  citizenInfo?: CitizenInfo;
}

@Resolver()
export class CitizenInfoResolver {
  @Mutation(() => CitizenInfoResponse)
  async citizenCreate(
    @Arg("options") options: CitizenInfoInput
  ): Promise<CitizenInfoResponse> {
    if ((await CitizenInfo.findOne(options.cnic)) !== undefined) {
      return {
        errors: [{ field: "cnic", message: "Citizen info already exists" }],
      };
    }
    return {
      citizenInfo: await CitizenInfo.create(options).save(),
    };
  }
}
