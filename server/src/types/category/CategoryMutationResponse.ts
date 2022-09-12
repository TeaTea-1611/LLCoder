import { Field, ObjectType } from "type-graphql";
import { MutationResponse } from "../MutationResponse";
import { FieldError } from "../FieldError";
import { ExerciseCategory } from "../../entities/ExerciseCategory";

@ObjectType({ implements: MutationResponse })
export class CategoryMutationResponse implements MutationResponse {
  code: number;
  success: boolean;
  message?: string;

  @Field(() => ExerciseCategory, { nullable: true })
  category?: ExerciseCategory;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}
