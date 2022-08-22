import { Context } from "../types/Context";
import { MiddlewareFn } from "type-graphql";
import { AuthenticationError } from "apollo-server-core";
import { User } from "../entities/User";

export const isAuth: (role?: number[]) => MiddlewareFn<Context> =
  (role: number[] = [0, 1, 2, 3, 4]) =>
  async ({ context }, next) => {
    if (!context.req.session.uid)
      throw new AuthenticationError("not authenticated");

    const user = await User.findOne({ where: { id: context.req.session.uid } });
    if (!user) throw new AuthenticationError("not authenticated");

    if (role.includes(user.role)) return next();

    throw new AuthenticationError("you don't have permission");
  };
