import { Citizen } from "../entities/citizen";
import {
  Field,
  ObjectType,
  Query,
  Resolver
  } from "type-graphql";

@ObjectType()
class Stat {
  @Field()
  total: number;

  @Field()
  lastDay: number;

  constructor(total: number, lastDay: number) {
    this.total = total;
    this.lastDay = lastDay;
  }
}

@ObjectType()
class Stats {
  @Field()
  firstDose: Stat;

  @Field()
  fullyVaccinated: Stat;

  @Field()
  totalDoses: Stat;

  constructor(firstDose: Stat, fullyVaccinated: Stat, totalDoses: Stat) {
    this.firstDose = firstDose;
    this.fullyVaccinated = fullyVaccinated;
    this.totalDoses = totalDoses;
  }
}

@Resolver()
export class StatsResolver {
  @Query(() => Stats)
  async getStats(): Promise<Stats> {
    const citizens = await Citizen.find();

    const f = citizens
      .map((c) => c.firstAppointment)
      .filter((a) => a?.completed);
    const f24 = f.filter(
      (a) => a && Date.now() - a.time.getTime() <= 60 * 60 * 24
    );

    const s = citizens
      .map((c) => c.secondAppointment)
      .filter((a) => a?.completed);
    const s24 = s.filter(
      (a) => a && Date.now() - a.time.getTime() <= 60 * 60 * 24
    );

    return new Stats(
      new Stat(f.length, f24.length),
      new Stat(s.length, s24.length),
      new Stat(f.length + s.length, f24.length + s24.length)
    );
  }
}
