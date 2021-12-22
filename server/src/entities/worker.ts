import { TrackedEntity } from "./trackedEntity";
import { Field, Int, ObjectType } from "type-graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Worker extends TrackedEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  static findByUsername = async (
    username: string
  ): Promise<Worker | undefined> =>
    await Worker.findOne(undefined, {
      where: { username },
    });
}
