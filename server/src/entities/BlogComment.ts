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
import { Blog } from "./Blog";
import { BlogCommentReactions } from "./BlogCommentReactions";

@ObjectType()
@Entity()
export class BlogComment extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  userId: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.blogComments)
  user!: User;

  @Column()
  blogId: number;

  @ManyToOne(() => Blog, (blog) => blog.comments)
  blog: Blog;

  @Field()
  @Column()
  comment!: string;

  @Field(() => ID, { nullable: true })
  @Column({ type: "int", nullable: true })
  parentId: number;

  @Field()
  @Column({ default: 0 })
  reactionsCount: number;

  @Field(() => [BlogCommentReactions])
  @OneToMany(() => BlogCommentReactions, (reaction) => reaction.comment)
  reactions: BlogCommentReactions[];
}
