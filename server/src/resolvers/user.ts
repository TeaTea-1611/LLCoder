import { User } from "../entities/User";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { LoginInput, RegisterInput, UserResponse } from "../types/UserResponse";
import argon2 from "argon2";
import { validateLogin, validateRegister } from "../utils/validate";

@Resolver(() => User)
export class UserResolver {
  @Query(() => [User], { nullable: true })
  async users(): Promise<User[] | null> {
    try {
      return await User.find();
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("registerInput") registerInput: RegisterInput
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

      const user = User.create({
        username,
        nickname: username,
        email,
        password: hashedPassword,
      });
      await user.save();
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
    @Arg("loginInput") loginInput: LoginInput
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
}
