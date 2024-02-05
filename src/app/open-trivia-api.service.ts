//https://opentdb.com/api_config.php
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OpenTriviaApiService {
  private questions: any;

  async getQuestions() {
    if (!this.questions) {
      const response = await fetch('https://opentdb.com/api.php?amount=50&type=multiple');
      this.questions = await response.json();
    }

    return this.questions;
  }
}
