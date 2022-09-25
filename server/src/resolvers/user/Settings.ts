import { UserSetting } from "../../entities/UserSetting";
import { Ctx, Query, Resolver, UseMiddleware } from "type-graphql";
import { Context } from "../../types/Context";
import { checkAuth } from "../../middlewares/auth";
import { UserSettings } from "../../types/user/UserMutationResponse";

@Resolver()
export class SettingsResolver {
  @UseMiddleware(checkAuth)
  @Query(() => UserSettings)
  async settings(@Ctx() { req }: Context): Promise<UserSettings> {
    const theme = await UserSetting.findOne({
      where: {
        user_id: req.userId,
        setting: {
          description: "Theme",
        },
      },
      relations: { allowed_setting_value: true },
    });
    const language = await UserSetting.findOne({
      where: {
        user_id: req.userId,
        setting: {
          description: "Language",
        },
      },
      relations: { allowed_setting_value: true },
    });
    return {
      theme: theme?.allowed_setting_value.value,
      language: language?.allowed_setting_value.value,
    };
  }
}
