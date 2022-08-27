import { Exercise } from "../../entities/Exercise";
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { Context } from "../../types/Context";
import { User } from "../../entities/User";
import { isAuth } from "../../middlewares/auth";
import { Category } from "../../entities/Category";
import { In } from "typeorm";
import { ExerciseMutationResponse } from "../../types/exercise/ExerciseMutationResponse";
import { CreateExerciseInput } from "../../types/exercise/CreateExerciseInput";

@Resolver()
export class CreateExerciseResolver {
  @UseMiddleware(isAuth())
  @Mutation(() => ExerciseMutationResponse)
  async createExercise(
    @Arg("data") data: CreateExerciseInput,
    @Ctx() { req }: Context
  ): Promise<ExerciseMutationResponse> {
    try {
      const user = User.findOne({ where: { id: req.session.uid } });
      if (!user)
        return {
          code: 401,
          success: false,
        };
      const { name, text, categories = [], difficulty = 0, exp = 10 } = data;
      const check = await Exercise.findOne({ where: { name } });
      if (check)
        return {
          code: 400,
          success: false,
          message: "title already exist",
        };

      const exercise = Exercise.create({
        userId: req.session.uid,
        name,
        text,
        difficulty,
        exp,
      });

      if (categories) {
        const findCategories = await Category.find({
          where: {
            id: In(categories),
          },
        });
        if (!findCategories)
          return {
            code: 400,
            success: false,
            message: "Categories not found",
          };
        exercise.categories = findCategories;
      }

      await exercise.save();

      return {
        code: 200,
        success: true,
        message: "craete success!",
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
