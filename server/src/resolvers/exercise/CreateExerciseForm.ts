import { ExerciseForm } from "../../entities/Exercise";
import { Arg, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { checkAuth } from "../../middlewares/auth";
import { ExerciseFormMutationResponse } from "../../types/exercise/ExerciseFormMutationResponse";

@Resolver()
export class CreateExerciseFormResolver {
  @UseMiddleware(checkAuth)
  @Mutation(() => ExerciseFormMutationResponse)
  async createExerciseForm(
    @Arg("name_vi") name_vi: string,
    @Arg("name_en") name_en: string
  ): Promise<ExerciseFormMutationResponse> {
    try {
      const check = await ExerciseForm.findOne({
        where: [{ name_en, name_vi }],
      });
      if (check)
        return {
          code: 409,
          success: false,
          message: "exercise form already exist",
        };
      const exercise_form = await ExerciseForm.create({
        name_en,
        name_vi,
      }).save();

      return {
        code: 200,
        success: true,
        message: "craete success!",
        exercise_form,
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
