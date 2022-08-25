import { Field, ID, InputType, ObjectType } from "type-graphql";
import { MutationResponse } from "./MutationResponse";
import { FieldError } from "./FieldError";
import { Blog } from "../entities/Blog";

@ObjectType({ implements: MutationResponse })
export class BlogResponse implements MutationResponse {
  code: number;
  success: boolean;
  message?: string;

  @Field(() => Blog, { nullable: true })
  blog?: Blog;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
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

@InputType()
export class CreateBlogInput {
  @Field()
  title: string;

  @Field()
  text: string;
}

@InputType()
export class UpdateBlogInput {
  @Field(() => ID)
  id: number;

  @Field()
  title: string;

  @Field()
  text: string;
}
