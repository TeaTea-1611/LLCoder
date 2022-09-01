import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./User";
import { BlogComment } from "./BlogComment";

@ObjectType()
@Entity()
export class BlogCommentReactions extends BaseEntity {
  @PrimaryColumn()
  userId: number;

  @ManyToOne(() => User, (user) => user.blogCommentReactions)
  user: User;

  @PrimaryColumn()
  commentId: number;

  @ManyToOne(() => BlogComment, (comment) => comment.reactions)
  comment: BlogComment;

  @Field()
  @Column()
  type: string;
}
