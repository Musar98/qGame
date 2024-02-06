//https://opentdb.com/api_config.php
import {Injectable} from '@angular/core';
import {TriviaQuestion} from "./Types";

@Injectable({
  providedIn: 'root'
})
export class OpenTriviaApiService {
  private questions: TriviaQuestion[] = [];

  async getQuestions(): Promise<TriviaQuestion[]> {
    try {
      const response = await fetch('https://opentdb.com/api.php?amount=50&type=multiple');
      this.questions = await response.json();
      console.log({
        response: response,
        jsn: this.questions
      })
    } catch (e) {
      console.log(e)
    }

    return this.questions;
  }
}
