import { Blog } from "../../entities/Blog";
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { BlogResponse, CreateBlogInput } from "../../types/BlogResponse";
import { Context } from "../../types/Context";
import { User } from "../../entities/User";
import { isAuth } from "../../middlewares/auth";

@Resolver()
export class CreateBlogResolver {
  @UseMiddleware(isAuth())
  @Mutation(() => BlogResponse)
  async createBlog(
    @Arg("data") data: CreateBlogInput,
    @Ctx() { req }: Context
  ): Promise<BlogResponse> {
    try {
      const user = User.findOne({ where: { id: req.session.uid } });
      if (!user)
        return {
          code: 401,
          success: false,
        };
      const { title, text } = data;
      const check = await Blog.findOne({ where: { title } });
      if (check)
        return {
          code: 400,
          success: false,
          message: "title already exist",
        };
      const blog = await Blog.create({
        userId: req.session.uid,
        title,
        text,
      }).save();

      return {
        code: 200,
        success: true,
        message: "craete success!",
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
