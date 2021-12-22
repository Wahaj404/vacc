import { Appointment } from "./appointment";
import { CitizenInfo } from "./citizenInfo";
import { TrackedEntity } from "./trackedEntity";
import { Field, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn
  } from "typeorm";

@ObjectType()
@Entity()
export class Citizen extends TrackedEntity {
  @Field()
  @PrimaryColumn()
  cnic: string;

  @Column()
  password: string;

  @Field(() => Appointment, { nullable: true })
  @OneToOne(() => Appointment, { nullable: true, eager: true })
  @JoinColumn()
  firstAppointment?: Appointment | null;

  @Field(() => Appointment, { nullable: true })
  @OneToOne(() => Appointment, { nullable: true, eager: true })
  @JoinColumn()
  secondAppointment?: Appointment | null;

  @Field(() => CitizenInfo)
  @OneToOne(() => CitizenInfo, (info) => info.citizen, { eager: true })
  @JoinColumn()
  info: CitizenInfo;
}
