import {
  Arg,
  Ctx,
  Int,
  Mutation,
  registerEnumType,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { Context } from "../../types/Context";
import { User } from "../../entities/User";
import { AuthenticationError, UserInputError } from "apollo-server-core";
import { Comment } from "../../entities/Comment";
import { isAuth } from "../../middlewares/auth";
import { ReactionsType } from "../../types/Reactions/ReactionsType";
import { Reactions } from "../../entities/Reactions";

registerEnumType(ReactionsType, {
  name: "ReactionsType",
});

@Resolver()
export class ReactionsResolver {
  @UseMiddleware(isAuth())
  @Mutation(() => Comment, { nullable: true })
  async reaction(
    @Arg("commentId", () => Int) commentId: number,
    @Arg("reactionsType", () => ReactionsType) reactionsType: ReactionsType,
    @Ctx() { req, connection }: Context
  ): Promise<Comment | null> {
    return await connection.transaction(async (transactionEntityManger) => {
      const user = await transactionEntityManger.findOne(User, {
        where: { id: req.session.uid },
      });
      if (!user) throw new AuthenticationError("Not Authentication");
      const comment = await transactionEntityManger.findOne(Comment, {
        where: { id: commentId },
      });
      if (!comment) throw new UserInputError("Comment not found");

      const existReaction = await transactionEntityManger.findOne(Reactions, {
        where: {
          userId: req.session.uid,
          commentId,
        },
      });
      if (!existReaction) {
        const reaction = transactionEntityManger.create(Reactions, {
          type: reactionsType,
          userId: req.session.uid,
          commentId,
        });
        await transactionEntityManger.save(reaction);
        comment.reactionsCount += 1;
        await transactionEntityManger.save(comment);
      } else {
        if (existReaction.type !== reactionsType) {
          existReaction.type = reactionsType;
          await transactionEntityManger.save(existReaction);
        } else {
          await transactionEntityManger.remove(existReaction);
          comment.reactionsCount -= 1;
          await transactionEntityManger.save(comment);
        }
      }

      return await transactionEntityManger.findOne(Comment, {
        where: { id: commentId },
        relations: {
          reactions: true,
        },
      });
    });
  }
}
