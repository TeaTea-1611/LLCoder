import { Blog } from "../../entities/Blog";
import {
  Arg,
  Ctx,
  Int,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { checkAuth } from "../../middlewares/auth";
import { Context } from "../../types/Context";
import { AuthenticationError } from "apollo-server-core";
import { User } from "../../entities/User";
import { BlogLike } from "../../entities/BlogLike";
@Resolver()
export class BlogResolver {
  @Query(() => Blog, { nullable: true })
  async blog(@Arg("id", () => Int) id: number): Promise<Blog | null> {
    return await Blog.findOne({
      where: { id },
      relations: {
        user: true,
        tags: true,
      },
    });
  }

  @UseMiddleware(checkAuth)
  @Mutation(() => Blog, { nullable: true })
  async likeBlog(
    @Arg("blogId", () => Int) blogId: number,
    @Ctx() { req, connection }: Context
  ): Promise<Blog | null> {
    return await connection.transaction(async (transactionEntityManage) => {
      const user = await transactionEntityManage.findOne(User, {
        where: { id: req.session.uid },
      });
      if (!user) throw new AuthenticationError("not authentication");

      const blog = await transactionEntityManage.findOne(Blog, {
        where: { id: blogId },
        relations: {
          user: true,
        },
      });
      if (!blog) return null;

      const existReaction = await transactionEntityManage.findOne(BlogLike, {
        where: {
          userId: user.id,
          blogId: blog.id,
        },
      });
      if (existReaction) {
        await transactionEntityManage.remove(existReaction);
        blog.likesCount -= 1;
      } else {
        const newReaction = transactionEntityManage.create(BlogLike, {
          userId: user.id,
          blogId: blog.id,
        });
        blog.likesCount += 1;
        await transactionEntityManage.save(newReaction);
      }
      await transactionEntityManage.save(blog);
      return blog;
    });
  }
}
