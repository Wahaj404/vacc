import { Citizen } from "./citizen";
import { VaccinationCenter } from "./vaccinationCenter";
import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class Appointment extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => VaccinationCenter)
  @ManyToOne(() => VaccinationCenter, (center) => center.appointments)
  center: Promise<VaccinationCenter>;

  @Field()
  @Column()
  vaccineName: string;

  @Field(() => Citizen)
  @OneToOne(() => Citizen)
  citizen: Promise<Citizen>;

  @Field()
  @Column()
  time: Date;

  @Field()
  @Column()
  completed: boolean = false;
}
