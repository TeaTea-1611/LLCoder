import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { ReactionsType } from "../types/Reactions/ReactionsType";
import { EntityComment } from "./EntityComment";
import { User } from "./User";

@ObjectType()
@Entity()
export class CommentReaction extends BaseEntity {
  @Field()
  @PrimaryColumn()
  user_id!: number;

  @Field(() => User)
  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id", referencedColumnName: "id" })
  user: User;

  @Field()
  @PrimaryColumn()
  comment_id: number;

  @Field(() => EntityComment)
  @ManyToOne(() => EntityComment)
  @JoinColumn({ name: "comment_id", referencedColumnName: "id" })
  comment: EntityComment;

  @Field()
  @Column({ enum: ReactionsType })
  type: ReactionsType;
}
