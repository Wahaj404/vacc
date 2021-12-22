import { Field, ObjectType } from "type-graphql";
import { Column } from "typeorm";

@ObjectType()
export class Location {
  @Field()
  @Column({ type: "real" })
  latitude: number;

  @Field()
  @Column({ type: "real" })
  longitude: number;
}
