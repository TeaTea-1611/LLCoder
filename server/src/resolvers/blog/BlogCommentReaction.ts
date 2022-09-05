import { AuthenticationError } from "apollo-server-core";
import {
  Arg,
  Ctx,
  Int,
  Mutation,
  registerEnumType,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { BlogComment } from "../../entities/BlogComment";
import { BlogCommentReactions } from "../../entities/BlogCommentReactions";
import { User } from "../../entities/User";
import { checkAuth } from "../../middlewares/auth";
import { Context } from "../../types/Context";
import { ReactionsType } from "../../types/Reactions/ReactionsType";

registerEnumType(ReactionsType, {
  name: "ReactionsType",
});

@Resolver()
export class BlogCommentReactionResolver {
  @UseMiddleware(checkAuth)
  @Mutation(() => BlogComment, { nullable: true })
  async reactionCommentBlog(
    @Arg("commentId", () => Int) commentId: number,
    @Arg("reactionType", () => ReactionsType) reactionType: ReactionsType,
    @Ctx() { req, connection }: Context
  ): Promise<BlogComment | null> {
    return await connection.transaction(async (transactionEntityManage) => {
      const user = await transactionEntityManage.findOne(User, {
        where: { id: req.session.uid },
      });
      if (!user) throw new AuthenticationError("Not authentication");
      const comment = await transactionEntityManage.findOne(BlogComment, {
        where: { id: commentId },
      });
      if (!comment) return null;

      const existReaction = await transactionEntityManage.findOne(
        BlogCommentReactions,
        {
          where: {
            userId: user.id,
            commentId: comment.id,
          },
        }
      );
      if (!existReaction) {
        const newReaction = transactionEntityManage.create(
          BlogCommentReactions,
          {
            userId: user.id,
            commentId: comment.id,
            type: reactionType,
          }
        );
        comment.reactionsCount += 1;
        await transactionEntityManage.save(newReaction);
      } else {
        if (existReaction.type !== reactionType) {
          existReaction.type = reactionType;
          await transactionEntityManage.save(existReaction);
        } else {
          comment.reactionsCount -= 1;
          await transactionEntityManage.remove(existReaction);
        }
      }
      await transactionEntityManage.save(comment);

      return await transactionEntityManage.findOne(BlogComment, {
        where: { id: commentId },
        relations: {
          user: true,
          reactions: true,
        },
      });
    });
  }
}
