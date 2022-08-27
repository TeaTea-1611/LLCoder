import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { Entity as _Entity } from "./Entity";
import { Reactions } from "./Reactions";

@ObjectType()
@Entity()
export class Comment extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  userId: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.comments)
  user!: User;

  @Column()
  entityId: number;

  @ManyToOne(() => _Entity, (entity) => entity.comments)
  entity: _Entity;

  @Field()
  @Column()
  comment!: string;

  @Field()
  @Column({ default: 0 })
  reactionsCount: number;

  @Field(() => [Reactions])
  @OneToMany(() => Reactions, (reaction) => reaction.comment)
  reactions: Reactions[];
}
