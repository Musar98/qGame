export interface TriviaQuestionsResponse {
  response_code: number;
  results: TriviaQuestion[];
}

export interface TriviaQuestion {
  type: string;
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface Category {
  id: number;
  name: string;
}

export interface TriviaCategoriesResponse {
  trivia_categories: Category[];
}
