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

@ObjectType()
export class PagtinatedExercises {
  @Field()
  totalCount!: number;

  @Field(() => [Exercise], { nullable: true })
  exercises?: Exercise[];
}

@InputType()
export class CreateExerciseInput {
  @Field()
  name: string;

  @Field()
  text: string;

  @Field({ nullable: true })
  difficulty: number;

  @Field(() => [ID], { nullable: true })
  categories: number[];

  @Field({ nullable: true })
  exp: number;
}
