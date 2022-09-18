import { _Entity } from "../../entities/Entity";
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { checkAuth } from "../../middlewares/auth";
import { Context } from "../../types/Context";
import { CreateExerciseInput } from "../../types/exercise/CreateExerciseInput";
import {
  ExerciseMutationResponse,
  InfoCreateExercise,
} from "../../types/exercise/ExerciseMutationResponse";
import { Category, Exercise, ExerciseForm } from "../../entities/Exercise";
import { User } from "../../entities/User";
import { In } from "typeorm";

@Resolver()
export class CreateExerciseResolver {
  @UseMiddleware(checkAuth)
  @Mutation(() => ExerciseMutationResponse)
  async createExercise(
    @Arg("data") data: CreateExerciseInput,
    @Ctx() { req, connection }: Context
  ) {
    return await connection.transaction(
      async (transactionEntityManage): Promise<ExerciseMutationResponse> => {
        const user = await transactionEntityManage.findOne(User, {
          where: { id: req.session.uid },
        });
        if (!user)
          return {
            code: 401,
            success: false,
          };
        const {
          title,
          content,
          difficulty_id,
          xp,
          category_id,
          form = [],
        } = data;

        const existsExercise = await transactionEntityManage.findOne(Exercise, {
          where: { title },
        });
        if (existsExercise)
          return {
            code: 409,
            success: false,
            errors: [{ field: "title", message: `${title} already exists` }],
          };

        const entity = transactionEntityManage.create(_Entity, {
          entity_type: "exercise",
        });

        await transactionEntityManage.save(entity);

        const exerciseForm = await transactionEntityManage.find(ExerciseForm, {
          where: { id: In(form) },
        });

        const exercise = transactionEntityManage.create(Exercise, {
          id: entity.id,
          user_id: user.id,
          title,
          content,
          difficulty_id,
          xp,
          category_id,
          form: exerciseForm,
        });

        await transactionEntityManage.save(exercise);

        return {
          code: 200,
          success: true,
          exercise,
        };
      }
    );
  }

  @Query(() => InfoCreateExercise)
  async infoCreateExercise(): Promise<InfoCreateExercise> {
    try {
      const exercisesForm = await ExerciseForm.find();
      const categories = await Category.find();
      return {
        categories,
        exercises_form: exercisesForm,
      };
    } catch (err) {
      return err;
    }
  }
}
