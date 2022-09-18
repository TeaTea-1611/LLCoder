import { Category } from "../../entities/Exercise";
import { Arg, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { checkAuth } from "../../middlewares/auth";
import { CategoryMutationResponse } from "../../types/exercise/CategoryMutationResponse";

@Resolver()
export class CreateCategoryResolver {
  @UseMiddleware(checkAuth)
  @Mutation(() => CategoryMutationResponse)
  async createCategory(
    @Arg("name") name: string
  ): Promise<CategoryMutationResponse> {
    try {
      const check = await Category.findOne({
        where: { name },
      });
      if (check)
        return {
          code: 400,
          success: false,
          message: "category already exist",
        };
      const category = await Category.create({
        name,
      }).save();

      return {
        code: 200,
        success: true,
        message: "craete success!",
        category,
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
