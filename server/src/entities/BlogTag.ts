import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Blog } from "./Blog";
@ObjectType()
@Entity()
export class BlogTag extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  name: string;

  @Field(() => [Blog])
  @ManyToMany(() => Blog, (blog) => blog.tags)
  blogs: Blog[];
}