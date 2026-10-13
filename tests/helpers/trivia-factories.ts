import type { TriviaQuestion } from '../../src/app/services/types';
import type { Question } from '../../src/app/gamescreen/types';

export function makeTriviaQuestion(overrides: Partial<TriviaQuestion> = {}): TriviaQuestion {
  return {
    type: 'multiple',
    difficulty: 'easy',
    category: 'General Knowledge',
    question: 'What is the capital of France?',
    correct_answer: 'Paris',
    incorrect_answers: ['London', 'Berlin', 'Rome'],
    ...overrides,
  };
}

export function makeQuestion(overrides: Partial<Question> = {}): Question {
  return {
    question: 'What is the capital of France?',
    answer: 'Paris',
    choices: ['Paris', 'London', 'Berlin', 'Rome'],
    ...overrides,
  };
}
