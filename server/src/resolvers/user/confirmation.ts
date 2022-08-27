import { User } from "../../entities/User";
import { Arg, Mutation, Resolver } from "type-graphql";
import bcrypt from "bcryptjs";
import { createConfirmationUrl } from "../../utils/createConfirmationUrl";
import { sendEmail } from "../../utils/sendEmail";
import { redis } from "../../redis";
import {
  forgotPasswordPrefix,
  userConfirmationPrefix,
} from "../../constans/redisPrefixed";
import { UserMutationResponse } from "../../types/user/UserMutationResponse";

@Resolver()
export class ConfirmationResolver {
  @Mutation(() => Boolean)
  async confirmUser(@Arg("token") token: string): Promise<Boolean> {
    const userId = await redis.get(userConfirmationPrefix + token);

    if (!userId) return false;

    await User.update({ id: parseInt(userId) }, { confirmed: true });

    await redis.del(userConfirmationPrefix + token);
    return true;
  }

  @Mutation(() => Boolean)
  async forgotPassword(@Arg("email") email: string): Promise<Boolean> {
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) return true;
      await sendEmail(
        email,
        await createConfirmationUrl(user.id, "forgot-password")
      );
      return true;
    } catch (err) {
      return false;
    }
  }

  @Mutation(() => UserMutationResponse)
  async resetPassword(
    @Arg("token") token: string,
    @Arg("password") password: string
  ): Promise<UserMutationResponse> {
    const userId = await redis.get(forgotPasswordPrefix + token);

    if (!userId) return { code: 400, success: false, message: "Token expired" };

    const hashedPassword = await bcrypt.hash(password, 12);

    await User.update({ id: parseInt(userId) }, { password: hashedPassword });

    await redis.del(forgotPasswordPrefix + token);
    return { code: 200, success: true, message: "Password updated" };
  }
}
