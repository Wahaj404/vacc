import { FieldError } from "./fieldError";
import { Appointment } from "../entities/appointment";
import { Citizen } from "../entities/citizen";
import { VaccinationCenter } from "../entities/vaccinationCenter";
import { Vaccine } from "../entities/vaccine";
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
class AppointmentInput {
  @Field()
  cnic: string;

  @Field()
  centerName: string;

  @Field()
  vaccineName: string;

  @Field()
  time: Date;
}

@ObjectType()
class AppointmentResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Appointment, { nullable: true })
  appointment?: Appointment;
}

@Resolver()
export class AppointmentResolver {
  @Mutation(() => AppointmentResponse)
  async createFirstAppointment(
    @Arg("options") options: AppointmentInput
  ): Promise<AppointmentResponse> {
    const center = await VaccinationCenter.findOne(options.centerName);
    if (center === undefined) {
      return {
        errors: [
          {
            field: "center name",
            message: "no center of that name",
          },
        ],
      };
    }

    const citizen = await Citizen.findOne(options.cnic);
    if (citizen === undefined) {
      return {
        errors: [
          {
            field: "cnic",
            message: "no citizen of that cnic is registered",
          },
        ],
      };
    }
    if (citizen.firstAppointment) {
      return {
        errors: [
          {
            field: "first appointment",
            message: "citizen already has first appointment",
          },
        ],
      };
    }

    const vaccine = center.vaccines.find((v) => v.name === options.vaccineName);
    if (vaccine === undefined || vaccine.doseCount <= 0) {
      return {
        errors: [
          {
            field: "vaccine name",
            message: `no vaccine of that name at ${center}`,
          },
        ],
      };
    }

    const appt = await Appointment.create({
      ...options,
      // citizen,
      // Promise.resolve(center),
    }).save();

    center.appointments.push(appt);
    await center.save();

    citizen.firstAppointment = appt;
    await citizen.save();

    return { appointment: appt };
  }

  @Mutation(() => AppointmentResponse)
  async createSecondAppointment(
    @Arg("options") options: AppointmentInput
  ): Promise<AppointmentResponse> {
    const center = await VaccinationCenter.findOne(options.centerName);
    if (center === undefined) {
      return {
        errors: [
          {
            field: "center name",
            message: "no center of that name",
          },
        ],
      };
    }

    const citizen = await Citizen.findOne(options.cnic);
    if (citizen === undefined) {
      return {
        errors: [
          {
            field: "cnic",
            message: "no citizen of that cnic is registered",
          },
        ],
      };
    }
    if (
      citizen.firstAppointment === undefined ||
      citizen.firstAppointment === null ||
      !citizen.firstAppointment.completed
    ) {
      return {
        errors: [
          {
            field: "first appointment",
            message: "citizen has not completed first appointment",
          },
        ],
      };
    }
    if (
      citizen.secondAppointment !== undefined &&
      citizen.secondAppointment !== null
    ) {
      return {
        errors: [
          {
            field: "second appointment",
            message: "citizen already has second appointment",
          },
        ],
      };
    }

    const vaccine = center.vaccines.find((v) => v.name === options.vaccineName);
    if (vaccine === undefined || vaccine.doseCount <= 0) {
      return {
        errors: [
          {
            field: "vaccine name",
            message: `no vaccine of that name at ${center}`,
          },
        ],
      };
    }

    const appt = await Appointment.create({
      ...options,
      // citizen,
      // center,
    }).save();

    center.appointments.push(appt);
    await center.save();

    citizen.secondAppointment = appt;
    await citizen.save();

    return { appointment: appt };
  }

  @Mutation(() => AppointmentResponse)
  async processAppointment(
    @Arg("appointmentId", () => Int) id: number,
    @Arg("cnic") cnic: string
    // @Arg("workerCnic") workerCnic : string
  ): Promise<AppointmentResponse> {
    const appointment = await Appointment.findOne(id);
    if (appointment === undefined) {
      return {
        errors: [{ field: "id", message: "invalid appointment id" }],
      };
    }
    if (appointment.completed !== false) {
      return {
        errors: [{ field: "id", message: "appointment already completed" }],
      };
    }

    const citizen = await Citizen.findOne(cnic);
    if (citizen === undefined) {
      return {
        errors: [{ field: "cnic", message: "invalid cnic" }],
      };
    }
    if (
      citizen.firstAppointment?.id !== id &&
      citizen.secondAppointment?.id !== id
    ) {
      return {
        errors: [
          {
            field: "cnic",
            message: "appointment does not belong to this citizen",
          },
        ],
      };
    }
    const vaccine = await Vaccine.findOne({
      where: {
        centerName: (await appointment.center).name,
        name: appointment.vaccineName,
      },
    });
    if (vaccine) {
      vaccine.doseCount -= 1;
      await vaccine?.save();
    }

    // const worker = Worker.findOne(workerCnic);
    // if (worker?.center.name !== appointment.center.name) {
    //   return {
    //     errors: [
    //       {
    //         field: "center name",
    //         message: "appointment is not of this center",
    //       },
    //     ],
    //   };
    // }

    appointment.completed = true;
    return { appointment: await appointment.save() };
  }

  @Mutation(() => [FieldError])
  async cancelAppointment(
    @Arg("appointmentId") id: number,
    @Arg("cnic") cnic: string
  ): Promise<FieldError[] | null> {
    const appointment = await Appointment.findOne(id);
    if (appointment === undefined) {
      return [{ field: "appointment id", message: "no appointment found" }];
    }
    const citizen = await Citizen.findOne(cnic);
    if (citizen?.firstAppointment?.id === appointment.id) {
      citizen.firstAppointment = null;
    } else if (citizen?.secondAppointment?.id === appointment.id) {
      citizen.secondAppointment = null;
    } else {
      return [
        {
          field: "citizen",
          message: "appointment does not belong to this citizen",
        },
      ];
    }
    await citizen.save();
    await appointment.remove();
    return [];
  }
}
