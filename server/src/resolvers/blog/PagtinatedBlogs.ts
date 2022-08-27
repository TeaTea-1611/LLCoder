import { Blog } from "../../entities/Blog";
import { Arg, Int, Query, Resolver } from "type-graphql";
import { PagtinatedBlogs } from "../../types/blog/BlogMutationResponse";
import { LessThan } from "typeorm";

@Resolver()
export class PagtinatedBlogsResolver {
  @Query(() => PagtinatedBlogs)
  async pagtinatedBlogs(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", { nullable: true }) cursor?: string
  ): Promise<PagtinatedBlogs | null> {
    try {
      const totalCount = await Blog.count({
        where: { confirmed: true },
      });
      const rLimit = Math.min(20, limit);

      const findOptions: { [key: string]: any } = {
        where: {
          confirmed: true,
        },
        order: {
          createdAt: "DESC",
        },
        take: rLimit,
        relations: {
          user: true,
        },
      };

      let lastBlog: Blog[] = [];

      if (cursor) {
        findOptions.where = { createdAt: LessThan(cursor), confirmed: true };
        lastBlog = await Blog.find({
          where: { confirmed: true },
          order: { createdAt: "ASC" },
          take: 1,
        });
      }

      const blogs = await Blog.find(findOptions);
      return {
        totalCount,
        cursor: blogs[blogs.length - 1].createdAt,
        hashMore: cursor
          ? lastBlog[0].createdAt.toString() !==
            blogs[blogs.length - 1].createdAt.toString()
          : blogs.length < totalCount,
        blogs,
      };
    } catch (err) {
      return null;
    }
  }
}
