import { BlogMutationResponse } from "../../types/blog/BlogMutationResponse";
import { CreateBlogInput } from "../../types/blog/CreateBlogInput";
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { In } from "typeorm";
import { Context } from "../../types/Context";
import { checkAuth } from "../../middlewares/auth";
import { User } from "../../entities/User";
import { _Entity } from "../../entities/Entity";
import { Blog, Tag } from "../../entities/Blog";

@Resolver()
export class CreateBlogResolver {
  @UseMiddleware(checkAuth)
  @Mutation(() => BlogMutationResponse)
  async createBlog(
    @Arg("data") data: CreateBlogInput,
    @Ctx() { req, connection }: Context
  ) {
    return await connection.transaction(
      async (transactionEntityManage): Promise<BlogMutationResponse> => {
        const user = await transactionEntityManage.findOne(User, {
          where: { id: req.userId },
        });
        if (!user)
          return {
            code: 401,
            success: false,
          };
        const entity = transactionEntityManage.create(_Entity, {
          entity_type: "blog",
        });

        await transactionEntityManage.save(entity);

        const { title, content, tags = [] } = data;

        const existTags = await transactionEntityManage.find(Tag, {
          where: { id: In(tags) },
        });
        const blog = transactionEntityManage.create(Blog, {
          id: entity.id,
          user_id: user.id,
          title,
          content,
          tags: existTags,
        });

        await transactionEntityManage.save(blog);

        return {
          code: 200,
          success: true,
          message: "Create new blog success",
          blog,
        };
      }
    );
  }
}
