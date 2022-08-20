import { Context } from "../types/Context";
import { MiddlewareFn } from "type-graphql";
import { AuthenticationError } from "apollo-server-core";

export const ResolveTime: MiddlewareFn<Context> = ({ context }, next) => {
  if (!context.req.session.uid)
    throw new AuthenticationError("Not authenticated");

  return next();
};
