import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
import { BlogComment } from "./BlogComment";
import { ReactionsType } from "../types/Reactions/ReactionsType";

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
  @Column({ enum: ReactionsType })
  type: ReactionsType;

  @Field()
  @CreateDateColumn({ type: "timestamptz" })
  createdAt!: Date;

  @Field()
  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt!: Date;
}
