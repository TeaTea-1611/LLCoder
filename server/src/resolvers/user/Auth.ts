import bcrypt from "bcryptjs";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../../entities/User";
import { Context } from "../../types/Context";
import { LoginInput, RegisterInput } from "../../types/user/LoginInput";
import { UserMutationResponse } from "../../types/user/UserMutationResponse";
import { createTokens } from "../../utils/auth";
import { createConfirmationUrl } from "../../utils/createConfirmationUrl";
import { sendEmail } from "../../utils/sendEmail";
import { validateLogin, validateRegister } from "../../utils/validate";

@Resolver(User)
export class AuthResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: Context): Promise<User | null> {
    if (!req.userId) return null;
    return await User.findOne({
      where: { id: req.userId },
      relations: {
        role: true,
        xp_level: true,
        xp_next_level: true,
      },
    });
  }

  @Mutation(() => UserMutationResponse)
  async register(
    @Arg("data") registerInput: RegisterInput
  ): Promise<UserMutationResponse> {
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

      const hashedPassword = await bcrypt.hash(password, 12);

      const user = await User.create({
        username,
        nickname: username,
        email,
        password: hashedPassword,
        role_id: "R4",
        level: 1,
        next_level: 2,
      }).save();

      await sendEmail(
        email,
        await createConfirmationUrl(user.id, "user-confirmation")
      );

      return {
        code: 200,
        success: true,
        message: "Register successfully",
      };
    } catch (err) {
      return {
        code: 500,
        success: false,
        message: "Internal server error: " + err.message,
      };
    }
  }

  @Mutation(() => UserMutationResponse)
  async login(
    @Arg("data") loginInput: LoginInput,
    @Ctx() { res }: Context
  ): Promise<UserMutationResponse> {
    const errors = validateLogin(loginInput);
    if (errors.length > 0) return { code: 400, success: false, errors };
    try {
      const { usernameOrEmail, password } = loginInput;
      const user = await User.findOne({
        where: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
        relations: {
          role: true,
          xp_level: true,
          xp_next_level: true,
        },
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
      const valid = await bcrypt.compare(password, user.password);
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

      if (!user.confirmed)
        return {
          code: 400,
          success: false,
          errors: [
            {
              field: "usernameOrEmail",
              message: "Account is not confirmed",
            },
          ],
        };

      const { accessToken, refreshToken } = createTokens(user.id);

      res.cookie("access-token", accessToken, {
        maxAge: 1000 * 60,
        httpOnly: true,
      });
      res.cookie("refresh-token", refreshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
      });

      return {
        code: 200,
        success: true,
        message: "Login successfully",
        user,
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
  async logout(@Ctx() { res }: Context): Promise<Boolean> {
    res.clearCookie("access-token");
    res.clearCookie("refresh-token");
    return true;
  }
}
