import { Field, ID, InputType } from "type-graphql";

@InputType()
export class CreateExerciseInput {
  @Field()
  title: string;

  @Field()
  content: string;

  @Field({ nullable: true })
  difficulty_id?: number;

  @Field({ nullable: true })
  category_id?: number;

  @Field(() => [ID], { nullable: true })
  form?: number[];

  @Field({ nullable: true })
  xp?: number;
}
