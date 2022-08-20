require("dotenv").config();
import "reflect-metadata";
import express from "express";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { UserResolver } from "./resolvers/user";
import mongoose from "mongoose";
import session from "express-session";
import { COOKIES_NAME, __prod__ } from "./constans";
import MongoStore from "connect-mongo";
import { Context } from "./types/Context";
import { ExerciseResolver } from "./resolvers/exercise";
import connectRedis from "connect-redis";

(async () => {
  await createConnection({
    type: "postgres",
    database: "llcoder",
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    logging: true,
    synchronize: true,
    entities: [__dirname + "/entities/*.*"],
  });
  const app = express();

  const RedisStore = connectRedis(session);

  const mongoUrl = process.env.MONGO_DB || "mongodb://localhost:27017/llcoder";
  await mongoose.connect(mongoUrl);
  console.log("MongoDB connected");

  app.use(
    session({
      name: COOKIES_NAME,
      store: new RedisStore({
        url: process.env.REDIS_URL || "redis://localhost:6379",
      }),
      cookie: {
        maxAge: 1000 * 60 * 60, // 1 hour
        httpOnly: true,
        secure: __prod__,
        sameSite: "lax",
      },
      secret: process.env.SESSION_SECRET as string,
      saveUninitialized: false,
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, ExerciseResolver],
      validate: false,
    }),
    context: ({ req, res }): Context => ({ req, res }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app, cors: false });

  const PORT = process.env.PORT || 4000;

  app.listen(PORT, () => {
    console.log(
      "server started on port " +
        PORT +
        ". graphql playground available at http://localhost:" +
        PORT +
        apolloServer.graphqlPath
    );
  });
})().catch((err) => console.error(err));
