import { Blog } from "../../entities/Blog";
import { Arg, Int, Query, Resolver } from "type-graphql";

@Resolver()
export class BlogResolver {
  @Query(() => Blog, { nullable: true })
  async blog(@Arg("id", () => Int) id: number): Promise<Blog | null> {
    return await Blog.findOne({ where: { id } });
  }
}
