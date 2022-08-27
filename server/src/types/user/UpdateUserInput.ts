import { Field, InputType } from "type-graphql";

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  nickname?: string;

  @Field({ nullable: true })
  password?: string;

  @Field({ nullable: true })
  dateOfBirth?: Date;
}
