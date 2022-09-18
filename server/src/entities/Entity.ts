import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { EntityComment } from "./EntityComment";
import { EntityReaction } from "./EntityReaction";

@ObjectType()
@Entity("entity")
export class _Entity extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  entity_type!: string;

  @Field()
  @Column({ default: 0 })
  comments_count: number;

  @Field(() => [EntityComment])
  @OneToMany(() => EntityComment, (comment) => comment.entity)
  comments: EntityComment[];

  @Field()
  @Column({ default: 0 })
  reactions_count: number;

  @Field(() => [EntityReaction])
  @OneToMany(() => EntityReaction, (reaction) => reaction.entity)
  reactions: EntityReaction[];
}
