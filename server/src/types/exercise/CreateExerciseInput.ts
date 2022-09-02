import { Field, ID, InputType } from "type-graphql";

@InputType()
export class CreateExerciseInput {
  @Field()
  name: string;

  @Field()
  text: string;

  @Field({ nullable: true })
  difficulty: number;

  @Field(() => [ID], { nullable: true })
  categories?: number[];

  @Field({ nullable: true })
  exp: number;
}
