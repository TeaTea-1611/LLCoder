import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./User";
import { Blog } from "./Blog";

@ObjectType()
@Entity()
export class BlogLike extends BaseEntity {
  @Field(() => ID)
  @PrimaryColumn()
  userId: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.blogCommentReactions)
  user: User;

  @Field(() => ID)
  @PrimaryColumn()
  blogId: number;

  @Field(() => Blog)
  @ManyToOne(() => Blog, (blog) => blog.likes)
  blog: Blog;
}
