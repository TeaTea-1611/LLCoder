import { Category } from "../../entities/Category";
import { Arg, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { isAuth } from "../../middlewares/auth";
import {
  CategoryResponse,
  CreateCategoryInput,
} from "../../types/CategoryResponse";

@Resolver()
export class CreateCategoryResolver {
  @UseMiddleware(isAuth([0]))
  @Mutation(() => CategoryResponse)
  async createCategory(
    @Arg("data") data: CreateCategoryInput
  ): Promise<CategoryResponse> {
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
