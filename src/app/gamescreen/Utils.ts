import {TriviaQuestion} from "../services/Types";
import {Question} from "./Types";

export function remapTriviaQuestions(triviaQuestions: TriviaQuestion[]): Question[] {
  return triviaQuestions.map((triviaQuestion) => {
    return {
      question: triviaQuestion.question,
      answer: triviaQuestion.correct_answer,
      choices: [...triviaQuestion.incorrect_answers, ...triviaQuestion.correct_answer],
    }
  })

}
