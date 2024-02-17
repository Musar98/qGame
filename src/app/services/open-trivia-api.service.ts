//https://opentdb.com/api_config.php
import { Injectable } from "@angular/core";
import { TriviaCategoriesResponse, TriviaQuestionsResponse } from "./Types";

@Injectable({
  providedIn: "root",
})
export class OpenTriviaApiService {
  async getQuestions(): Promise<TriviaQuestionsResponse | undefined> {
    try {
      const response = await fetch(
        "https://opentdb.com/api.php?amount=50&type=multiple",
      );
      return response.json();
    } catch (e) {
      console.error("There was an error fetching questions from opentdb:", e);
      return;
    }
  }

  async getCategories(): Promise<TriviaCategoriesResponse> {
    const response = await fetch("https://opentdb.com/api_category.php");
    return response.json();
  }
}
