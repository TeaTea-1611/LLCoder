import { Field, ID, InputType } from "type-graphql";

@InputType()
export class CreateBlogInput {
  @Field()
  title: string;

  @Field()
  text: string;

  @Field(() => [ID], { nullable: true })
  tags?: number[];
}
