import { Field, InputType } from "type-graphql";

@InputType()
export class CreateBlogInput {
  @Field()
  title: string;

  @Field()
  text: string;
}
