import { Field, InputType, Int } from "type-graphql";

@InputType()
export class BlogCommentInput {
  @Field(() => Int)
  blogId: number;

  @Field()
  comment: string;

  @Field(() => Int, { nullable: true })
  parentId?: number;
}
