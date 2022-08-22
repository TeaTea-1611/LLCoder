import { Exercise } from "../../entities/Exercise";
import {
  CreateExerciseInput,
  ExerciseResponse,
} from "../../types/ExerciseResponse";
import { Arg, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { isAuth } from "../../middlewares/auth";

@Resolver()
export class CreateExerciseResolver {
  @UseMiddleware(isAuth())
  @Mutation(() => ExerciseResponse)
  async createExercise(
    @Arg("data") data: CreateExerciseInput
  ): Promise<ExerciseResponse> {
    try {
      const { name, description, markdown, difficulty, exp } = data;
      const checkExercise = await Exercise.findOne({ where: { name } });
      if (checkExercise)
        return {
          code: 400,
          success: false,
          errors: [
            {
              field: "name",
              message: "Exercise already exists",
            },
          ],
        };
      const exercise = await Exercise.create({
        name,
        description,
        markdown,
        difficulty,
        exp,
      }).save();

      return {
        code: 200,
        success: true,
        exercise,
      };
    } catch (err) {
      return {
        code: 500,
        success: false,
        message: "Internal server error" + err.message,
      };
    }
  }
}
