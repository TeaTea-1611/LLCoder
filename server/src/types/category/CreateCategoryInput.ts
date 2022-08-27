import { Field, InputType } from "type-graphql";

@InputType()
export class CreateCategoryInput {
  @Field()
  nameVi: string;

  @Field()
  nameEn: string;
}
