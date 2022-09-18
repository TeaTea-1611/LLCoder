import { Category } from "../../entities/Exercise";
import { Field, ObjectType } from "type-graphql";
import { FieldError } from "../FieldError";
import { MutationResponse } from "../MutationResponse";

@ObjectType({ implements: MutationResponse })
export class CategoryMutationResponse implements MutationResponse {
  code: number;
  success: boolean;
  message?: string;

  @Field({ nullable: true })
  category?: Category;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}
