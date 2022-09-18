import { Category, Exercise, ExerciseForm } from "../../entities/Exercise";
import { Field, ObjectType } from "type-graphql";
import { FieldError } from "../FieldError";
import { MutationResponse } from "../MutationResponse";

@ObjectType({ implements: MutationResponse })
export class ExerciseMutationResponse implements MutationResponse {
  code: number;
  success: boolean;
  message?: string;

  @Field({ nullable: true })
  exercise?: Exercise;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}

@ObjectType()
export class PagtinatedExercises {
  @Field()
  totalCount!: number;

  @Field(() => [Exercise], { nullable: true })
  exercises?: Exercise[];
}

@ObjectType()
export class InfoCreateExercise {
  @Field(() => [ExerciseForm], { nullable: true })
  exercises_form?: ExerciseForm[];

  @Field(() => [Category], { nullable: true })
  categories?: Category[];
}
