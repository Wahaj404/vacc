import { __prod__ } from "./constants";
import { Appointment } from "./entities/appointment";
import { Citizen } from "./entities/citizen";
import { CitizenInfo } from "./entities/citizenInfo";
import { VaccinationCenter } from "./entities/vaccinationCenter";
import { Vaccine } from "./entities/vaccine";
import { Worker } from "./entities/worker";
import { AppointmentResolver } from "./resolvers/appointment";
import { CitizenResolver } from "./resolvers/citizen";
import { CitizenInfoResolver } from "./resolvers/citizenInfo";
import { StatsResolver } from "./resolvers/stats";
import { VaccinationCenterResolver } from "./resolvers/vaccinationCenter";
import { WorkerResolver } from "./resolvers/worker";
import { MyContext } from "./types";
import { ApolloServer } from "apollo-server-express";
import connectRedis from "connect-redis";
import cors from "cors";
import express from "express";
import session from "express-session";
import IORedis from "ioredis";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";

const main = async () => {
  await createConnection({
    type: "postgres",
    database: "dbdb",
    username: "postgres",
    password: "postgres",
    logging: !__prod__,
    synchronize: true,
    entities: [
      Appointment,
      Citizen,
      CitizenInfo,
      VaccinationCenter,
      Vaccine,
      Worker,
    ],
  });

  const RedisStore = connectRedis(session);
  const redis = new IORedis();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        AppointmentResolver,
        CitizenResolver,
        CitizenInfoResolver,
        StatsResolver,
        VaccinationCenterResolver,
        // VaccineResolver,
        WorkerResolver,
      ],
      validate: false,
    }),
    context: ({ req, res }): MyContext => ({ req, res, redis }),
    uploads: false,
  });

  const app = express();
  app.use(
    cors({
      origin: ["http://localhost:3000", "http://localhost:3001"],
      credentials: true,
    })
  );

  app.use(
    session({
      name: "vacc",
      store: new RedisStore({
        client: redis as any,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        httpOnly: true,
        sameSite: "lax",
        secure: __prod__,
      },
      resave: false,
      secret: "vacc-motor",
      saveUninitialized: false,
    })
  );

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });
  app.listen(4000, () => console.log("Server started on localhost:4000"));
};

main();
