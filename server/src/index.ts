require("dotenv").config();
import "reflect-metadata";
import express from "express";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { Context } from "./types/Context";
import cors from "cors";
import { graphqlUploadExpress } from "graphql-upload";
import { createSchema } from "./utils/createSchema";
import cookieParser from "cookie-parser";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "./constans/constans";
import { verify } from "jsonwebtoken";
import { User } from "./entities/User";
import { createTokens } from "./utils/auth";

(async () => {
  const connection = await createConnection({
    type: "postgres",
    database: "postgres",
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    logging: true,
    synchronize: true,
    entities: [__dirname + "/entities/*.js"],
  });
  const app = express();
  const PORT = process.env.PORT || 4000;

  app.use(graphqlUploadExpress());
  app.use(express.static("public"));
  app.use(cookieParser());
  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000",
    })
  );

  app.use(async (req: any, res, next) => {
    const accessToken = req.cookies["access-token"];
    const refreshToken = req.cookies["refresh-token"];
    if (!accessToken && !refreshToken) return next();

    let data;

    try {
      data = verify(accessToken, ACCESS_TOKEN_SECRET) as any;
      req.userId = data.userId;
      return next();
    } catch {}

    if (!refreshToken) return next();

    try {
      data = verify(refreshToken, REFRESH_TOKEN_SECRET) as any;
    } catch {
      return next();
    }

    const user = await User.findOne({ where: { id: data.userId } });
    if (!user) return next();

    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
      createTokens(user.id);

    res.cookie("access-token", newAccessToken, {
      maxAge: 1000 * 60,
      httpOnly: true,
    });
    res.cookie("refresh-token", newRefreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    });
    req.userId = user.id;

    return next();
  });

  const schema = await createSchema();

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }): Context => ({ req, res, connection }),
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
