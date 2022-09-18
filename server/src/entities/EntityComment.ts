import { ReactionsType } from "../types/Reactions/ReactionsType";
import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { _Entity } from "./Entity";
import { User } from "./User";

@ObjectType()
@Entity()
export class EntityComment extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  entity_id!: number;

  @ManyToOne(() => _Entity)
  @JoinColumn({ name: "entity_id", referencedColumnName: "id" })
  entity: _Entity;

  @Field()
  @Column()
  user_id!: number;

  @Field(() => User)
  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id", referencedColumnName: "id" })
  user: User;

  @Field()
  @Column()
  comment: string;

  @Field()
  @Column({ default: 0 })
  replies_count: number;

  @Field()
  @Column({ nullable: true })
  parent_id: number;

  @Field(() => [EntityComment], { nullable: true })
  @OneToMany(() => EntityComment, (reply) => reply.parent)
  replies: EntityComment[];

  @Field(() => EntityComment, { nullable: true })
  @ManyToOne(() => EntityComment, (comment) => comment.replies)
  @JoinColumn({ name: "parent_id", referencedColumnName: "id" })
  parent: EntityComment;

  @Field()
  @Column({ default: 0 })
  reactions_count: number;

  @Field(() => [CommentReaction])
  @OneToMany(() => CommentReaction, (reaction) => reaction.comment)
  reactions: CommentReaction[];

  @Field()
  @CreateDateColumn({ type: "timestamptz" })
  created_at!: Date;

  @Field()
  @UpdateDateColumn({ type: "timestamptz" })
  updated_at!: Date;
}

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
