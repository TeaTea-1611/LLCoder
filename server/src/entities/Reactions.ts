import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./User";
import { Entity as _Entity } from "./Entity";
import { Comment } from "./Comment";

@ObjectType()
@Entity()
export class Reactions extends BaseEntity {
  @PrimaryColumn()
  userId: number;

  @ManyToOne(() => User, (user) => user.reactions)
  user: User;

  @PrimaryColumn()
  commentId: number;

  @ManyToOne(() => Comment, (comment) => comment.reactions)
  comment: Comment;

  @Field()
  @Column()
  type: string;
}
