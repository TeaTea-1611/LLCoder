import { Field, ObjectType } from "type-graphql";
import { MutationResponse } from "../MutationResponse";
import { FieldError } from "../FieldError";
import { Category } from "../../entities/Category";

@ObjectType({ implements: MutationResponse })
export class CategoryMutationResponse implements MutationResponse {
  code: number;
  success: boolean;
  message?: string;

  @Field(() => Category, { nullable: true })
  category?: Category;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}
