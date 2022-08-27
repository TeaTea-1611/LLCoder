import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { User } from "../../entities/User";
import { Context } from "../../types/Context";

@Resolver()
export class SettingsResolver {
  @Mutation(() => Boolean)
  async setDarkModeSetting(@Ctx() { req }: Context): Promise<Boolean> {
    try {
      if (!req.session.uid) return false;
      const user = await User.findOne({ where: { id: req.session.uid } });
      if (!user) return false;
      user.darkMode = !user.darkMode;
      await user.save();
      return true;
    } catch {
      return false;
    }
  }

  @Mutation(() => Boolean)
  async setLanguageSetting(
    @Arg("language") language: string,
    @Ctx() { req }: Context
  ): Promise<Boolean> {
    try {
      if (!req.session.uid) return false;
      const user = await User.findOne({ where: { id: req.session.uid } });
      if (!user) return false;
      user.language = language;
      await user.save();
      return true;
    } catch {
      return false;
    }
  }
}
