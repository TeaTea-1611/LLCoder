import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { CommentReaction } from "./CommentReactions";
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
  reactions_count: number;

  @Field(() => [CommentReaction])
  @OneToMany(() => CommentReaction, (reaction) => reaction.comment)
  reactions: CommentReaction[];

  @Field()
  @CreateDateColumn({ type: "timestamptz" })
  createdAt!: Date;

  @Field()
  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt!: Date;
}
