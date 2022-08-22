import { User } from "../entities/User";
import { Field, ObjectType } from "type-graphql";
import { MutationResponse } from "./MutationResponse";
import { FieldError } from "./FieldError";

@ObjectType({ implements: MutationResponse })
export class UserResponse implements MutationResponse {
  code: number;
  success: boolean;
  message?: string;

  @Field({ nullable: true })
  user?: User;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}

@ObjectType({ implements: MutationResponse })
export class UsersResponse implements MutationResponse {
  code: number;
  success: boolean;
  message?: string;

  @Field(() => [User], { nullable: true })
  users?: User[];
}
