import { User } from "../entities/User";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import {
  LoginInput,
  RegisterInput,
  UserResponse,
  UsersResponse,
} from "../types/UserResponse";
import argon2 from "argon2";
import { validateLogin, validateRegister } from "../utils/validate";
import { Context } from "../types/Context";
import { COOKIES_NAME } from "../constans";

@Resolver()
export class UserResolver {
  @Query(() => UsersResponse)
  async users(): Promise<UsersResponse> {
    try {
      const users = await User.find();
      return {
        code: 200,
        success: true,
        users,
      };
    } catch (err) {
      return {
        code: 500,
        success: false,
        message: "Internal server error" + err.message,
      };
    }
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("data") registerInput: RegisterInput,
    @Ctx() { req }: Context
  ): Promise<UserResponse> {
    const errors = validateRegister(registerInput);
    if (errors.length > 0) return { code: 400, success: false, errors };

    try {
      const { username, email, password } = registerInput;

      const checkUser = await User.findOne({
        where: [{ username }, { email }],
      });
      if (checkUser) {
        const field = checkUser.username === username ? "username" : "email";
        return {
          code: 400,
          success: false,
          errors: [
            {
              field: field,
              message: `${field} already exists`,
            },
          ],
        };
      }

      const hashedPassword = await argon2.hash(password);

      const user = await User.create({
        username,
        nickname: username,
        email,
        password: hashedPassword,
      }).save();

      req.session.uid = user.id;

      return {
        code: 200,
        success: true,
        message: "Register successfully",
      };
    } catch (err) {
      return {
        code: 500,
        success: false,
        message: "Internal server error" + err.message,
      };
    }
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("data") loginInput: LoginInput,
    @Ctx() { req }: Context
  ): Promise<UserResponse> {
    const errors = validateLogin(loginInput);
    if (errors.length > 0) return { code: 400, success: false, errors };
    try {
      const { usernameOrEmail, password } = loginInput;
      const user = await User.findOne({
        where: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
      });
      if (!user)
        return {
          code: 400,
          success: false,
          errors: [
            {
              field: "usernameOrEmail",
              message: "Account does not exist",
            },
          ],
        };
      const valid = await argon2.verify(user.password, password);
      if (!valid)
        return {
          code: 400,
          success: false,
          errors: [
            {
              field: "password",
              message: "Password is incorrect",
            },
          ],
        };

      req.session.uid = user.id;

      return {
        code: 200,
        success: true,
        message: "Login successfully",
      };
    } catch (err) {
      return {
        code: 500,
        success: false,
        message: "Internal server error" + err.message,
      };
    }
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { req, res }: Context): Promise<Boolean> {
    return new Promise((resolve) => {
      User.update({ id: req.session.uid }, { lastLogin: new Date() })
        .then(() => {
          res.clearCookie(COOKIES_NAME);
          req.session.destroy((err) => {
            if (err) throw err;
            resolve(true);
          });
        })
        .catch(() => {
          res.clearCookie(COOKIES_NAME);
          req.session.destroy((err) => {
            if (err) throw err;
            resolve(true);
          });
        });
    });
  }
}
