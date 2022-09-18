import { Field, ID, InputType } from "type-graphql";

@InputType()
export class CreateBlogInput {
  @Field()
  title: string;

  @Field()
  content: string;

  @Field(() => [ID], { nullable: true })
  tags?: number[];
}
