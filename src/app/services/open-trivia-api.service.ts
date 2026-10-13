import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import type { TriviaCategoriesResponse, TriviaQuestionsResponse } from './types';

const API_BASE_URL = 'https://opentdb.com';
export const DEFAULT_QUESTION_COUNT = 50;
export const MAX_QUESTION_COUNT = 50;
export const MIN_QUESTION_COUNT = 1;

/**
 * Thin wrapper around the Open Trivia Database API.
 * See https://opentdb.com/api_config.php
 */
@Injectable({ providedIn: 'root' })
export class OpenTriviaApiService {
  private readonly http = inject(HttpClient);

  async getQuestions(
    amount = DEFAULT_QUESTION_COUNT,
    categoryId?: number,
  ): Promise<TriviaQuestionsResponse | undefined> {
    const sanitizedAmount = Math.min(
      MAX_QUESTION_COUNT,
      Math.max(MIN_QUESTION_COUNT, Math.floor(amount) || DEFAULT_QUESTION_COUNT),
    );
    try {
      const params: Record<string, string | number> = {
        amount: sanitizedAmount,
        type: 'multiple',
      };
      if (categoryId) {
        params['category'] = categoryId;
      }
      const response = await firstValueFrom(
        this.http.get<TriviaQuestionsResponse>(`${API_BASE_URL}/api.php`, {
          params,
        }),
      );
      if (!response || !Array.isArray(response.results)) {
        console.error('Unexpected questions response from opentdb:', response);
        return undefined;
      }
      return response;
    } catch (error) {
      console.error('There was an error fetching questions from opentdb:', error);
      return undefined;
    }
  }

  async getCategories(): Promise<TriviaCategoriesResponse | undefined> {
    try {
      return await firstValueFrom(
        this.http.get<TriviaCategoriesResponse>(`${API_BASE_URL}/api_category.php`),
      );
    } catch (error) {
      console.error('There was an error fetching categories from opentdb:', error);
      return undefined;
    }
  }
}
