import { Field, InputType } from "type-graphql";

@InputType()
export class CreateUserInput {
  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  role: number;
}

@InputType()
export class RegisterInput {
  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  password: string;
}

@InputType()
export class LoginInput {
  @Field()
  usernameOrEmail: string;

  @Field()
  password: string;
}

@InputType()
export class UpdateUserInput {
  @Field()
  nickname?: string;

  @Field({ nullable: true })
  password?: string;

  @Field({ nullable: true })
  dateOfBirth?: Date;
}
