import { Exercise } from "../../entities/Exercise";
import { Arg, Int, Query, Resolver } from "type-graphql";

@Resolver()
export class PagtinatedExercisesResolver {
  @Query(() => Exercise, { nullable: true })
  async exercise(@Arg("id", () => Int) id: number): Promise<Exercise | null> {
    try {
      const exercise = await Exercise.findOne({
        where: { id: id },
        relations: {
          user: true,
          entity: true,
          category: true,
          difficulty: true,
          form: true,
        },
      });
      return exercise;
    } catch (err) {
      return null;
    }
  }
}
