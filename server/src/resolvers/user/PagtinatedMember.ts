import { Arg, Int, Query, Resolver } from "type-graphql";
import { PagtinatedMember } from "../../types/user/UserMutationResponse";
import { User } from "../../entities/User";

@Resolver()
export class PagtinatedMemberResolver {
  @Query(() => PagtinatedMember)
  async pagtinatedMember(
    @Arg("limit", () => Int, { nullable: true }) limit: number = 15,
    @Arg("page", () => Int, { nullable: true }) page: number = 1
  ): Promise<PagtinatedMember | null> {
    const totalCount = await User.count({
      where: { confirmed: true },
    });

    const rLimit = Math.min(20, limit);

    if (Math.ceil(totalCount / rLimit) < page)
      return {
        totalCount,
      };

    const members = await User.find({
      where: { confirmed: true },
      order: { createdAt: "DESC" },
      take: rLimit,
      skip: (page - 1) * rLimit,
    });

    try {
      return {
        totalCount: totalCount,
        members,
      };
    } catch (err) {
      return null;
    }
  }
}
