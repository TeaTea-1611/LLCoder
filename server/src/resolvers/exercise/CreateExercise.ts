import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { checkAuth } from "../../middlewares/auth";
import { Context } from "../../types/Context";
import { CreateExerciseInput } from "../../types/exercise/CreateExerciseInput";
import { ExerciseMutationResponse } from "../../types/exercise/ExerciseMutationResponse";

@Resolver()
export class CreateExerciseResolver {
  @UseMiddleware(checkAuth)
  @Mutation(() => ExerciseMutationResponse)
  async createExercise(
    @Arg("data") data: CreateExerciseInput,
    @Ctx() { req, connection }: Context
  ): Promise<ExerciseMutationResponse> {
    return await connection.transaction(async (transactionEntityManage) => {
      try {
        const {} = data;
        return {
          code: 200,
          success: true,
        };
      } catch (err) {
        return {
          code: 500,
          success: false,
          message: "Internal server error: " + err.message,
        };
      }
    });
  }
}
