import { Field, ID, InputType, ObjectType } from "type-graphql";
import { MutationResponse } from "./MutationResponse";
import { FieldError } from "./FieldError";
import { Exercise } from "../entities/Exercise";

@ObjectType({ implements: MutationResponse })
export class ExerciseResponse implements MutationResponse {
  code: number;
  success: boolean;
  message?: string;

  @Field({ nullable: true })
  exercise?: Exercise;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}

@ObjectType({ implements: MutationResponse })
export class ExercisesResponse implements MutationResponse {
  code: number;
  success: boolean;
  message?: string;

  @Field(() => [Exercise], { nullable: true })
  exercises?: Exercise[];
}

@InputType()
export class CreateExerciseInput {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  markdown: string;

  @Field()
  difficulty: number;

  @Field()
  exp: number;
}

@InputType()
export class UpdateExerciseInput {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  markdown: string;

  @Field()
  difficulty: number;

  @Field()
  exp: number;
}
