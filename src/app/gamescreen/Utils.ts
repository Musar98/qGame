import {TriviaQuestion} from "../services/Types";
import {Question} from "./Types";


//this ensures that the correct answer is not always inserted at the end of the array.
function shuffleChoices(choices: string[]) {
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


//todo fix encoded text
export function remapTriviaQuestions(triviaQuestions: TriviaQuestion[]): Question[] {
  return triviaQuestions.map((triviaQuestion) => {
    return {
      question: triviaQuestion.question,
      answer: triviaQuestion.correct_answer,
      choices: shuffleChoices([...triviaQuestion.incorrect_answers, triviaQuestion.correct_answer]),
    }
  })
}
