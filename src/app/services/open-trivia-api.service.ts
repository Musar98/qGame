//https://opentdb.com/api_config.php
import { Injectable } from "@angular/core";
import { TriviaCategoriesResponse, TriviaQuestionsResponse } from "./Types";

@Injectable({
  providedIn: "root",
})
export class OpenTriviaApiService {
  async getQuestions(): Promise<TriviaQuestionsResponse> {
    const response = await fetch(
      "https://opentdb.com/api.php?amount=10&type=multiple",
    );
    return response.json();
  }

  async getCategories(): Promise<TriviaCategoriesResponse> {
    const response = await fetch("https://opentdb.com/api_category.php");
    return response.json();
  }
}
