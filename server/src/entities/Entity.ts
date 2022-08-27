import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity as _Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Comment } from "./Comment";

@ObjectType()
@_Entity()
export class Entity extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  entityType: string;

  @Field(() => [Comment])
  @OneToMany(() => Comment, (comment) => comment.entity)
  comments: Comment[];

  @Field()
  @Column({ default: 0 })
  reactionsCount: number;
}
