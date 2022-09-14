import { Arg, Int, Query, Resolver } from "type-graphql";
import { IsNull } from "typeorm";
import { EntityComment } from "../../entities/EntityComment";

@Resolver()
export class CommentResolver {
  @Query(() => [EntityComment], { nullable: true })
  async comments(
    @Arg("entity_id", () => Int) entity_id: number
  ): Promise<EntityComment[] | null> {
    return await EntityComment.find({
      where: {
        entity_id,
        parent_id: IsNull(),
      },
      take: 5,
    });
  }
}
