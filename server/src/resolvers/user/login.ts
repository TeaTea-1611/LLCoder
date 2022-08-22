import { User } from "../../entities/User";
import { Context } from "../../types/Context";
import { LoginInput, RegisterInput } from "../../types/InputType";
import { UserResponse } from "../../types/UserResponse";
import { validateLogin, validateRegister } from "../../utils/validate";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import bcrypt from "bcryptjs";
import { COOKIES_NAME } from "../../constans/constans";
import { createConfirmationUrl } from "../../utils/createConfirmationUrl";
import { sendEmail } from "../../utils/sendEmail";

@Resolver()
export class LoginResolver {
  @Mutation(() => UserResponse)
  async register(
    @Arg("data") registerInput: RegisterInput
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

      const hashedPassword = await bcrypt.hash(password, 12);

      const user = await User.create({
        username,
        nickname: username,
        email,
        password: hashedPassword,
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

  @Query(() => UserResponse)
  async me(@Ctx() { req }: Context): Promise<UserResponse> {
    try {
      const user = await User.findOne({ where: { id: req.session.uid } });
      if (!user)
        return { code: 400, success: false, message: "User not found" };
      return {
        code: 200,
        success: true,
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
}
