import { Exercise } from "../entities/Exercise";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import {
  CreateExerciseInput,
  ExerciseResponse,
  ExercisesResponse,
  UpdateExerciseInput,
} from "../types/ExerciseResponse";

@Resolver()
export class ExerciseResolver {
  @Query(() => ExercisesResponse)
  async exercises(): Promise<ExercisesResponse> {
    try {
      const exercises = await Exercise.find();
      return {
        code: 200,
        success: true,
        exercises,
      };
    } catch (err) {
      return {
        code: 500,
        success: false,
        message: "Internal server error" + err.message,
      };
    }
  }

  @Query(() => ExerciseResponse)
  async exercise(@Arg("id") id: number): Promise<ExerciseResponse> {
    try {
      const exercise = await Exercise.findOne({ where: { id } });
      if (!exercise)
        return {
          code: 404,
          success: false,
          message: "Exercise not found",
        };
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

  @Mutation(() => ExerciseResponse)
  async createExercise(
    @Arg("createExerciseInput") createExerciseInput: CreateExerciseInput
  ): Promise<ExerciseResponse> {
    try {
      const { name, description, markdown, difficulty, exp } =
        createExerciseInput;
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

  @Mutation(() => ExerciseResponse)
  async updateExercise(
    @Arg("updateExerciseInput") updateExerciseInput: UpdateExerciseInput
  ): Promise<ExerciseResponse> {
    try {
      const { id, name, description, markdown, difficulty, exp } =
        updateExerciseInput;
      const exercise = await Exercise.findOne({ where: { id } });
      if (!exercise)
        return {
          code: 404,
          success: false,
          message: "Exercise not found",
        };
      if (name !== exercise.name) {
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
      }

      exercise.name = name;
      exercise.description = description;
      exercise.markdown = markdown;
      exercise.difficulty = difficulty;
      exercise.exp = exp;
      await exercise.save();
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

  @Mutation(() => ExerciseResponse)
  async deleteExercise(@Arg("id") id: number): Promise<ExerciseResponse> {
    try {
      const exercise = await Exercise.findOne({ where: { id } });
      if (!exercise)
        return {
          code: 404,
          success: false,
          message: "Exercise not found",
        };
      await exercise.remove();

      return {
        code: 200,
        success: true,
        message: "Delete success",
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
