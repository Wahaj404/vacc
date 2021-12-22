import { VaccinationCenter } from "./vaccinationCenter";
import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn
  } from "typeorm";

@ObjectType()
@Entity()
export class Vaccine extends BaseEntity {
  @Field()
  @PrimaryColumn()
  centerName: string;

  @Field()
  @PrimaryColumn()
  name: string;

  @Field(() => Int)
  @Column()
  doseCount: number;

  @Field(() => VaccinationCenter)
  @ManyToOne(() => VaccinationCenter, (center) => center.vaccines)
  center: VaccinationCenter;

  // static findByName = async (name: string): Promise<Vaccine | undefined> =>
  //   await Vaccine.findOne(undefined, {
  //     where: { name },
  //   });
}
