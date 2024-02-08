//https://opentdb.com/api_config.php
import {Injectable} from '@angular/core';
import {TriviaResponse} from "./Types";

@Injectable({
  providedIn: 'root'
})
export class OpenTriviaApiService {

  async getQuestions(): Promise<TriviaResponse | undefined> {
    try {
      const response = await fetch('https://opentdb.com/api.php?amount=50&type=multiple');
      return response.json();

    } catch (e) {
      console.log(e)
    }
    return;
  }
}
