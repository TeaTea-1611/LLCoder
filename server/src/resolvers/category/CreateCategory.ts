import { Category } from "../../entities/Category";
import { Arg, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { checkAuth } from "../../middlewares/auth";
import { CategoryMutationResponse } from "../../types/category/CategoryMutationResponse";
import { CreateCategoryInput } from "../../types/category/CreateCategoryInput";

@Resolver()
export class CreateCategoryResolver {
  @UseMiddleware(checkAuth)
  @Mutation(() => CategoryMutationResponse)
  async createCategory(
    @Arg("data") data: CreateCategoryInput
  ): Promise<CategoryMutationResponse> {
    try {
      const { nameVi, nameEn } = data;
      const check = await Category.findOne({ where: [{ nameEn }, { nameVi }] });
      if (check)
        return {
          code: 400,
          success: false,
          message: "category already exist",
        };
      const category = await Category.create({
        nameVi,
        nameEn,
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
