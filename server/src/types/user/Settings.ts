import { Field, ObjectType } from "type-graphql";

export enum LanguageType {
  vi = "vi",
  en = "en",
}

export enum ThemeType {
  dark = "dark",
  light = "light",
}

@ObjectType()
export class ThemeSettingResponse {
  @Field()
  theme: ThemeType.dark | ThemeType.light;
}

@ObjectType()
export class LanguageSettingResponse {
  @Field()
  language: LanguageType.vi | LanguageType.en;
}
