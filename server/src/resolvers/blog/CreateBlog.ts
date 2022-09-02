import { checkAuth } from "../../middlewares/auth";
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { Blog } from "../../entities/Blog";
import { User } from "../../entities/User";
import { BlogMutationResponse } from "../../types/blog/BlogMutationResponse";
import { CreateBlogInput } from "../../types/blog/CreateBlogInput";
import { Context } from "../../types/Context";
import { AuthenticationError } from "apollo-server-core";
import { BlogTag } from "../../entities/BlogTag";
import { In } from "typeorm";

@Resolver()
export class CreateBlogResolver {
  @UseMiddleware(checkAuth)
  @Mutation(() => BlogMutationResponse)
  async createBlog(
    @Arg("data") data: CreateBlogInput,
    @Ctx() { req, connection }: Context
  ): Promise<BlogMutationResponse> {
    return await connection.transaction(async (transactionEntityManage) => {
      const user = await User.findOne({ where: { id: req.session.uid } });
      if (!user) throw new AuthenticationError("not authentication");
      const { title, text, tags = [] } = data;
      const existBlog = await Blog.findOne({ where: { title } });
      if (existBlog)
        return {
          code: 400,
          success: false,
          errors: [{ field: "title", message: "title already exists" }],
        };

      const blog = transactionEntityManage.create(Blog, {
        userId: user.id,
        title,
        text,
      });

      if (tags) {
        const findTags = await BlogTag.find({
          where: {
            id: In(tags),
          },
        });
        if (!findTags)
          return {
            code: 400,
            success: false,
          };
        blog.tags = findTags;
      }

      await transactionEntityManage.save(blog);

      return {
        code: 200,
        success: true,
        blog,
      };
    });
  }
}
