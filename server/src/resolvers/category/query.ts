import { Query, Resolver } from "type-graphql";
import { Category } from "../../entities/Category";

@Resolver()
export class QueryCategoriesResolver {
  @Query(() => [Category])
  async categories(): Promise<Category[] | null> {
    try {
      return await Category.find();
    } catch (err) {
      return null;
    }
  }
}
