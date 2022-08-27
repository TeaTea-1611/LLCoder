import { AuthenticationError, UserInputError } from "apollo-server-core";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { Blog } from "../../entities/Blog";
import { Entity } from "../../entities/Entity";
import { User } from "../../entities/User";
import { BlogMutationResponse } from "../../types/blog/BlogMutationResponse";
import { CreateBlogInput } from "../../types/blog/CreateBlogInput";
import { Context } from "../../types/Context";

@Resolver()
export class CreateBlogResolver {
  @Mutation(() => BlogMutationResponse)
  async createBlog(
    @Arg("data") data: CreateBlogInput,
    @Ctx() { req, connection }: Context
  ): Promise<BlogMutationResponse> {
    return await connection.transaction(async (transactionEntityManger) => {
      const user = await transactionEntityManger.findOne(User, {
        where: { id: req.session.uid },
      });
      if (!user) throw new AuthenticationError("Not Authentication");
      const { title, text } = data;
      const check = await transactionEntityManger.findOne(Blog, {
        where: { title },
      });
      if (check) throw new UserInputError("Title already exist");

      const entity = transactionEntityManger.create(Entity, {
        entityType: "blog",
      });
      await transactionEntityManger.save(entity);

      const blog = transactionEntityManger.create(Blog, {
        entityId: entity.id,
        userId: req.session.uid,
        title,
        text,
        confirmed: true,
      });
      await transactionEntityManger.save(blog);

      return {
        code: 200,
        success: true,
        blog,
      };
    });
  }
}
