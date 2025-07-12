import { TriviaQuestion } from "../services/Types";
import { Question } from "./Types";
import { OpenTriviaApiService } from "../services/open-trivia-api.service";
import {DEMO_QUESTIONS} from './Constants';

class GameScreenUtils {
  constructor(private openTriviaApiService: OpenTriviaApiService) {}

  //this ensures that the correct answer is not always inserted at the end of the array.
  //rewrite, just need a random number 0-4 to access array of choices
  private shuffleChoices(choices: string[]) {
    let shuffled: string[] = [];
    const numberOfChoices = choices.length;

    let indices = Array.from({ length: numberOfChoices }, (_, index) => index);

    for (let i = numberOfChoices - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }

    for (const index of indices) {
      shuffled.push(choices[index]);
    }

    return shuffled;
  }

  private parseHtml(htmlString: string): string {
    const parsedDoc = new DOMParser().parseFromString(htmlString, "text/html");
    return parsedDoc.body.textContent || "";
  }

  private remapTriviaQuestions(triviaQuestions: TriviaQuestion[]): Question[] {
    return triviaQuestions.map((triviaQuestion) => {
      const question = this.parseHtml(triviaQuestion.question);
      const answer = this.parseHtml(triviaQuestion.correct_answer);
      const shuffledChoices = this.shuffleChoices([
        ...triviaQuestion.incorrect_answers,
        answer,
      ]);
      const choices = shuffledChoices.map(this.parseHtml);

      return {
        question,
        answer,
        choices,
      };
    });
  }

  public async getTriviaQuestions(amount:number=50): Promise<Question[]> {
    const triviaQuestions = await this.openTriviaApiService.getQuestions(amount);
    if (!triviaQuestions?.results) {
      console.error({
        response: triviaQuestions,
        results: triviaQuestions?.results,
        status_code: triviaQuestions?.response_code,
      });
      return DEMO_QUESTIONS;
    } else {
      return this.remapTriviaQuestions(triviaQuestions.results);
    }
  }
}

export const gameScreenUtils = new GameScreenUtils(new OpenTriviaApiService());
