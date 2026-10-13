import { Injectable, inject } from '@angular/core';
import type { TriviaQuestion } from '../services/types';
import { OpenTriviaApiService } from '../services/open-trivia-api.service';
import { DEMO_QUESTIONS } from './demo-questions.constants';
import type { Question } from './types';

/** Fisher-Yates shuffle. Returns a new array, never mutates the input. */
export function shuffleChoices(choices: string[]): string[] {
  const shuffled = [...choices];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/** Decode HTML entities found in the trivia API payloads. */
export function decodeHtml(htmlString: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  return doc.body.textContent ?? '';
}

export function remapTriviaQuestions(triviaQuestions: TriviaQuestion[]): Question[] {
  return triviaQuestions.map((triviaQuestion) => {
    const question = decodeHtml(triviaQuestion.question);
    const answer = decodeHtml(triviaQuestion.correct_answer);
    const rawChoices = [...triviaQuestion.incorrect_answers.map(decodeHtml), answer];
    return { question, answer, choices: shuffleChoices(rawChoices) };
  });
}

/**
 * Loads trivia questions, falling back to bundled demo questions when
 * the API is unreachable or returns an unexpected payload.
 */
@Injectable({ providedIn: 'root' })
export class GameScreenUtils {
  private readonly triviaApi = inject(OpenTriviaApiService);

  async getTriviaQuestions(categoryId?: number, amount = 50): Promise<Question[]> {
    const response = await this.triviaApi.getQuestions(amount, categoryId);
    if (!response?.results?.length) {
      console.error('Falling back to demo questions. API response:', response);
      return DEMO_QUESTIONS.slice(0, Math.max(1, amount)).map((question) => ({
        ...question,
        choices: [...question.choices],
      }));
    }
    return remapTriviaQuestions(response.results);
  }
}
