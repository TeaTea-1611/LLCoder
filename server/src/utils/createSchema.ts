import { buildSchema } from "type-graphql";

export const createSchema = () =>
  buildSchema({
    resolvers: [__dirname + "/../resolvers/**/*.js"],
    authChecker: ({ context: { req } }) => {
      return !!req.session.uid;
    },
  });
