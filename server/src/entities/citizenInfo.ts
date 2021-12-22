import { Citizen } from "./citizen";
import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryColumn
  } from "typeorm";

@ObjectType()
@Entity()
export class CitizenInfo extends BaseEntity {
  @Field()
  @PrimaryColumn()
  cnic: string;

  @Field()
  @Column()
  name: string;

  @Field(() => Int)
  @Column()
  age: number;

  @Field(() => Citizen)
  @OneToOne(() => Citizen, (citizen) => citizen.info)
  citizen: Citizen;
}
