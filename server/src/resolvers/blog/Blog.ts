import { Blog } from "../../entities/Blog";
import { Arg, Int, Query, Resolver } from "type-graphql";

@Resolver()
export class BlogResolver {
  @Query(() => Blog)
  async blog(@Arg("id", () => Int) id: number): Promise<Blog | null> {
    return await Blog.findOne({
      where: { entityId: id },
      relations: {
        user: true,
        entity: {
          comments: {
            user: true,
          },
        },
      },
    });
  }
}
