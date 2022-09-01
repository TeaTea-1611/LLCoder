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
import { BlogComment } from "../../entities/BlogComment";
import { BlogCommentInput } from "../../types/blog/BlogCommentInput";
import { BlogCommentMutationResponse } from "../../types/blog/BlogMutationResponse";
import { Context } from "../../types/Context";
import { checkAuth } from "../../middlewares/auth";
import { User } from "../../entities/User";
import { AuthenticationError } from "apollo-server-core";
import { IsNull } from "typeorm";

@Resolver()
export class BlogResolver {
  @UseMiddleware(checkAuth)
  @Mutation(() => BlogCommentMutationResponse)
  async createBlogComment(
    @Arg("data") data: BlogCommentInput,
    @Ctx() { req }: Context
  ): Promise<BlogCommentMutationResponse> {
    try {
      const user = await User.findOne({ where: { id: req.session.uid } });
      if (!user) throw new AuthenticationError("not authentication");
      const { blogId, comment, parentId } = data;
      const existBLog = await Blog.findOne({ where: { id: blogId } });
      if (!existBLog)
        return {
          code: 400,
          success: false,
          message: "Blog not found",
        };
      if (parentId) {
        const parentComment = await BlogComment.findOne({
          where: { id: parentId },
        });
        if (!parentComment || parentComment.blogId !== blogId)
          return {
            code: 400,
            success: false,
            message: "Invalid comment",
          };
      }
      const newComment = await BlogComment.create({
        blogId,
        userId: user.id,
        comment,
        parentId,
      }).save();
      return {
        code: 200,
        success: true,
        comment: newComment,
      };
    } catch (err) {
      return {
        code: 500,
        success: false,
        message: "Internal server error" + err.message,
      };
    }
  }

  @Query(() => [BlogComment], { nullable: true })
  async blogComments(
    @Arg("blogId", () => Int) blogId: number
  ): Promise<BlogComment[] | null> {
    return await BlogComment.find({ where: { blogId, parentId: IsNull() } });
  }

  @Query(() => [BlogComment], { nullable: true })
  async blogChildrenComments(
    @Arg("commentId", () => Int) commentId: number
  ): Promise<BlogComment[] | null> {
    return await BlogComment.find({ where: { parentId: commentId } });
  }
}
