import { User } from "../../entities/User";
import { Field, ObjectType } from "type-graphql";
import { MutationResponse } from "../MutationResponse";
import { FieldError } from "../FieldError";

@ObjectType({ implements: MutationResponse })
export class UserMutationResponse implements MutationResponse {
  code: number;
  success: boolean;
  message?: string;

  @Field({ nullable: true })
  user?: User;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}

@ObjectType()
export class PagtinatedMember {
  @Field()
  totalCount!: number;

  @Field(() => [User], { nullable: true })
  members?: User[];
}

@ObjectType()
export class UserSettings {
  @Field({ nullable: true })
  theme?: string;

  @Field({ nullable: true })
  language?: string;
}
