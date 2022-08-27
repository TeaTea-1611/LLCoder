import { Arg, Int, Query, Resolver } from "type-graphql";
import { User } from "../../entities/User";

@Resolver()
export class ProfileResolver {
  @Query(() => User)
  async profile(@Arg("id", () => Int) id: number): Promise<User | null> {
    return await User.findOne({
      where: { id },
    });
  }
}
