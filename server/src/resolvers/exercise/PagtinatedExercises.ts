import { Exercise } from "../../entities/Exercise";
import { Arg, Int, Query, Resolver } from "type-graphql";
import { PagtinatedExercises } from "../../types/exercise/ExerciseMutationResponse";

@Resolver()
export class PagtinatedExercisesResolver {
  @Query(() => PagtinatedExercises)
  async pagtinatedExercises(
    @Arg("limit", () => Int, { nullable: true }) limit: number = 15,
    @Arg("page", () => Int, { nullable: true }) page: number = 1
  ): Promise<PagtinatedExercises | null> {
    const totalCount = await Exercise.count({
      where: { confirmed: true },
    });

    const rLimit = Math.min(20, limit);

    if (Math.ceil(totalCount / rLimit) < page)
      return {
        totalCount,
      };

    const exercises = await Exercise.find({
      where: { confirmed: true },
      order: { createdAt: "DESC" },
      take: rLimit,
      skip: (page - 1) * rLimit,
      relations: {
        categories: true,
      },
    });

    try {
      return {
        totalCount: totalCount,
        exercises,
      };
    } catch (err) {
      return null;
    }
  }
}
