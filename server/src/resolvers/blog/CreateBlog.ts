import { Blog } from "../../entities/Blog";
import { Arg, Ctx, Int, Mutation, Resolver } from "type-graphql";
import { Context } from "../../types/Context";
import { User } from "../../entities/User";
import { AuthenticationError, UserInputError } from "apollo-server-core";
import { Entity } from "../../entities/Entity";
import { Comment } from "../../entities/Comment";
import { CreateBlogInput } from "../../types/blog/CreateBlogInput";
import { BlogMutationResponse } from "../../types/blog/BlogMutationResponse";

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

  @Mutation(() => Comment, { nullable: true })
  async createComment(
    @Arg("id", () => Int) id: number,
    @Arg("comment") comment: string,
    @Ctx() { req, connection }: Context
  ): Promise<Comment | null> {
    return await connection.transaction(async (transactionEntityManger) => {
      const user = await transactionEntityManger.findOne(User, {
        where: { id: req.session.uid },
      });
      if (!user) throw new AuthenticationError("Not Authentication");
      return await transactionEntityManger
        .create(Comment, {
          comment,
          entityId: id,
          userId: req.session.uid,
        })
        .save();
    });
  }
}
