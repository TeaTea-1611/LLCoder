import { Arg, Ctx, Int, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { Context } from "../../types/Context";
import { User } from "../../entities/User";
import { AuthenticationError, UserInputError } from "apollo-server-core";
import { Entity } from "../../entities/Entity";
import { Comment } from "../../entities/Comment";
import { isAuth } from "../../middlewares/auth";

@Resolver()
export class CommentResolver {
  @UseMiddleware(isAuth())
  @Mutation(() => Comment, { nullable: true })
  async comment(
    @Arg("entityId", () => Int) entityId: number,
    @Arg("comment") comment: string,
    @Ctx() { req, connection }: Context
  ): Promise<Comment | null> {
    return await connection.transaction(async (transactionEntityManger) => {
      const user = await transactionEntityManger.findOne(User, {
        where: { id: req.session.uid },
      });
      if (!user) throw new AuthenticationError("Not Authentication");

      const newComment = transactionEntityManger.create(Comment, {
        comment,
        entityId,
        userId: req.session.uid,
      });

      await transactionEntityManger.save(newComment);

      const entity = await transactionEntityManger.findOne(Entity, {
        where: { id: entityId },
      });

      if (!entity) throw new UserInputError("Entity not found");
      entity.commentsCount += 1;

      await transactionEntityManger.save(entity);

      return await transactionEntityManger.findOne(Comment, {
        where: { id: newComment.id },
        relations: {
          user: true,
        },
      });
    });
  }
}
