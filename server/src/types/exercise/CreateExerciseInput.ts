import { Field, ID, InputType } from "type-graphql";

@InputType()
export class TestcaseInput {
  @Field({ nullable: true })
  input?: string;

  @Field({ nullable: true })
  output?: string;
}

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

  @Field({ nullable: true })
  file_input?: string;

  @Field({ nullable: true })
  file_output?: string;

  @Field(() => [TestcaseInput], { nullable: true })
  testcase?: TestcaseInput[];
}
