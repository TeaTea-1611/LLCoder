require("dotenv").config();
import "reflect-metadata";
import express from "express";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import session from "express-session";
import { COOKIES_NAME, __prod__ } from "./constans/constans";
import { Context } from "./types/Context";
import connectRedis from "connect-redis";
import { redis } from "./redis";
import cors from "cors";
import { graphqlUploadExpress } from "graphql-upload";
import { createSchema } from "./utils/createSchema";

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
  const PORT = process.env.PORT || 4000;

  app.use(graphqlUploadExpress());
  app.use(express.static("public"));

  const RedisStore = connectRedis(session);

  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000",
    })
  );

  app.use(
    session({
      name: COOKIES_NAME,
      store: new RedisStore({
        client: redis,
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

  const schema = await createSchema();

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }): Context => ({ req, res }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app, cors: false });

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
