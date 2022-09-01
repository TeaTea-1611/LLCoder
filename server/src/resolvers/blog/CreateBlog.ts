import { checkAuth } from "../../middlewares/auth";
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { Blog } from "../../entities/Blog";
import { User } from "../../entities/User";
import { BlogMutationResponse } from "../../types/blog/BlogMutationResponse";
import { CreateBlogInput } from "../../types/blog/CreateBlogInput";
import { Context } from "../../types/Context";

@Resolver()
export class CreateBlogResolver {
  @UseMiddleware(checkAuth)
  @Mutation(() => BlogMutationResponse)
  async createBlog(
    @Arg("data") data: CreateBlogInput,
    @Ctx() { req }: Context
  ): Promise<BlogMutationResponse> {
    try {
      const user = await User.findOne({ where: { id: req.session.uid } });
      if (!user)
        return {
          code: 401,
          success: false,
          message: "not authentication",
        };
      const { title, text } = data;
      const existBlog = await Blog.findOne({ where: { title } });
      if (existBlog)
        return {
          code: 400,
          success: false,
          errors: [{ field: "title", message: "title already exists" }],
        };
      const blog = await Blog.create({
        userId: user.id,
        title,
        text,
      }).save();

      return {
        code: 200,
        success: true,
        blog,
      };
    } catch (err) {
      return {
        code: 500,
        success: false,
        message: "Internal server error" + err.message,
      };
    }
  }
}
