import { FieldError } from "./fieldError";
import { VaccinationCenter } from "../entities/vaccinationCenter";
import { Vaccine } from "../entities/vaccine";
import {
  Arg,
  Field,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";

@InputType()
class LocationInput {
  @Field()
  latitude: number;

  @Field()
  longitude: number;
}

@InputType()
class VaccinationCenterInput {
  @Field()
  name: string;

  @Field()
  location: LocationInput;
}

@InputType()
class VaccineInput {
  @Field()
  centerName: string;

  @Field()
  name: string;

  @Field(() => Int)
  doseCount: number;
}

@ObjectType()
class VaccinationCenterResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => VaccinationCenter, { nullable: true })
  vaccinationCenter?: VaccinationCenter;
}

@Resolver()
export class VaccinationCenterResolver {
  @Mutation(() => VaccinationCenterResponse)
  async createVaccinationCenter(
    @Arg("vaccinationCenter") options: VaccinationCenterInput
  ): Promise<VaccinationCenterResponse> {
    if ((await VaccinationCenter.findOne(options.name)) !== undefined) {
      return {
        errors: [
          {
            field: "name",
            message: "a vaccination center of that name already exists",
          },
        ],
      };
    }
    return {
      vaccinationCenter: await VaccinationCenter.create(options).save(),
    };
  }

  @Mutation(() => VaccinationCenterResponse)
  async addVaccineToCenter(
    @Arg("vaccine") vaccineInput: VaccineInput
  ): Promise<VaccinationCenterResponse> {
    const center = await VaccinationCenter.findOne(vaccineInput.centerName);
    if (center === undefined) {
      return {
        errors: [
          {
            field: "name",
            message: "no vaccination center of that name exists",
          },
        ],
      };
    }
    if (center.vaccines === undefined) {
      center.vaccines = [];
    }
    let vaccine = center.vaccines.find((v) => v.name === vaccineInput.name);
    if (vaccine === undefined) {
      vaccine = Vaccine.create(vaccineInput);
      center.vaccines.push(vaccine);
    } else {
      vaccine.doseCount += vaccineInput.doseCount;
    }
    await vaccine.save();
    return { vaccinationCenter: await center.save() };
  }

  @Query(() => [VaccinationCenter])
  async vaccinationCenters(): Promise<VaccinationCenter[]> {
    return await VaccinationCenter.find();
  }
}
