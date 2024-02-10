import { OpenTriviaApiService } from "./services/open-trivia-api.service";
import { Category, TriviaCategoriesResponse } from "./services/Types";

class Utils {
  constructor(private openTriviaApiService: OpenTriviaApiService) {}

  public async getCategoryNames(): Promise<string[]> {
    const categoriesResponse: TriviaCategoriesResponse =
      await this.openTriviaApiService.getCategories();

    const categories: Category[] = categoriesResponse.trivia_categories;
    return categories.map((category) => category.name).sort();
  }
}


export const utils = new Utils(new OpenTriviaApiService());
