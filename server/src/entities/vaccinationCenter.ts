import { Appointment } from "./appointment";
import { Location } from "./location";
import { Vaccine } from "./vaccine";
import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class VaccinationCenter extends BaseEntity {
  @Field()
  @PrimaryColumn()
  name: String;

  @Field(() => [Appointment], { nullable: true })
  @OneToMany(() => Appointment, (appointment) => appointment.center, {
    eager: true,
  })
  appointments: Appointment[];

  @Field(() => [Vaccine], { nullable: true })
  @OneToMany(() => Vaccine, (vaccine) => vaccine.center, { eager: true })
  @JoinTable()
  vaccines: Vaccine[];

  @Field()
  @Column(() => Location)
  location: Location;
}
