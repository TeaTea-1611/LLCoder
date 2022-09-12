import { User } from "../../entities/User";
import { Context } from "../../types/Context";
import { validateLogin, validateRegister } from "../../utils/validate";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import bcrypt from "bcryptjs";
import { COOKIES_NAME } from "../../constans/constans";
import { createConfirmationUrl } from "../../utils/createConfirmationUrl";
import { sendEmail } from "../../utils/sendEmail";
import { UserMutationResponse } from "../../types/user/UserMutationResponse";
import { LoginInput, RegisterInput } from "../../types/user/LoginInput";
import { Role } from "../../entities/Role";

@Resolver()
export class LoginResolver {
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
      const roleUser = await Role.findOne({
        where: {
          value: "R4",
          name_en: "user",
        },
      });

      const user = await User.create({
        username,
        nickname: username,
        email,
        password: hashedPassword,
        role_id: roleUser ? roleUser.value : undefined,
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
    @Ctx() { req }: Context
  ): Promise<UserMutationResponse> {
    const errors = validateLogin(loginInput);
    if (errors.length > 0) return { code: 400, success: false, errors };
    try {
      const { usernameOrEmail, password } = loginInput;
      const user = await User.findOne({
        where: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
        relations: {
          role: true,
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

      req.session.uid = user.id;

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
  async logout(@Ctx() { req, res }: Context): Promise<Boolean> {
    return new Promise((resolve) => {
      User.update({ id: req.session.uid }, { last_login: new Date() })
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

  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: Context): Promise<User | null> {
    if (!req.session.uid) return null;
    return await User.findOne({
      where: { id: req.session.uid },
    });
  }
}
