import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class UploadImageResponse {
  @Field({ nullable: true })
  url?: string;
}
