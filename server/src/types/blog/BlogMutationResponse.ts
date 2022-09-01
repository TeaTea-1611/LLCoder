import { Field, ObjectType } from "type-graphql";
import { MutationResponse } from "../MutationResponse";
import { FieldError } from "../FieldError";
import { Blog } from "../../entities/Blog";
import { BlogComment } from "../../entities/BlogComment";

@ObjectType({ implements: MutationResponse })
export class BlogMutationResponse implements MutationResponse {
  code: number;
  success: boolean;
  message?: string;

  @Field(() => Blog, { nullable: true })
  blog?: Blog;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}

@ObjectType({ implements: MutationResponse })
export class BlogCommentMutationResponse implements MutationResponse {
  code: number;
  success: boolean;
  message?: string;

  @Field(() => BlogComment, { nullable: true })
  comment?: BlogComment;
}

@ObjectType()
export class PagtinatedBlogs {
  @Field()
  totalCount!: number;

  @Field(() => Date)
  cursor!: Date;

  @Field()
  hashMore!: boolean;

  @Field(() => [Blog], { nullable: true })
  blogs?: Blog[];
}
