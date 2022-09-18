import { ExerciseForm } from "../../entities/Exercise";
import { Field, ObjectType } from "type-graphql";
import { FieldError } from "../FieldError";
import { MutationResponse } from "../MutationResponse";

@ObjectType({ implements: MutationResponse })
export class ExerciseFormMutationResponse implements MutationResponse {
  code: number;
  success: boolean;
  message?: string;

  @Field({ nullable: true })
  exercise_form?: ExerciseForm;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}
