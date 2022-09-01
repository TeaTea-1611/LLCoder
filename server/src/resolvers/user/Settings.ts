import { checkAuth } from "../../middlewares/auth";
import {
  Arg,
  Ctx,
  Mutation,
  registerEnumType,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { User } from "../../entities/User";
import { Context } from "../../types/Context";
import {
  ThemeSettingResponse,
  ThemeType,
  LanguageSettingResponse,
  LanguageType,
} from "../../types/user/Settings";
import { AuthenticationError } from "apollo-server-core";

registerEnumType(ThemeType, {
  name: "ThemeType",
});

registerEnumType(LanguageType, {
  name: "LanguageType",
});
@Resolver()
export class SettingsResolver {
  @UseMiddleware(checkAuth)
  @Mutation(() => ThemeSettingResponse)
  async setThemeSetting(
    @Arg("themeType", () => ThemeType) themeType: ThemeType,
    @Ctx() { req }: Context
  ): Promise<ThemeSettingResponse> {
    try {
      const user = await User.findOne({ where: { id: req.session.uid } });
      if (!user) throw new AuthenticationError("Not Authentication");
      user.theme = themeType;
      await user.save();
      return {
        theme: themeType,
      };
    } catch (err) {
      return err;
    }
  }

  @UseMiddleware(checkAuth)
  @Mutation(() => LanguageSettingResponse)
  async setLanguageSetting(
    @Arg("languageType", () => LanguageType) language: LanguageType,
    @Ctx() { req }: Context
  ): Promise<LanguageSettingResponse> {
    try {
      const user = await User.findOne({ where: { id: req.session.uid } });
      if (!user) throw new AuthenticationError("Not Authentication");
      user.language = language;
      await user.save();
      return {
        language,
      };
    } catch (err) {
      return err;
    }
  }
}
