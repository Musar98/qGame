import { TriviaQuestion } from "../services/Types";
import { Question } from "./Types";

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

function parseHtml(htmlString: string): string {
  const parsedDoc = new DOMParser().parseFromString(htmlString, "text/html");
  return parsedDoc.body.textContent || "";
}

export function remapTriviaQuestions(
  triviaQuestions: TriviaQuestion[],
): Question[] {
  return triviaQuestions.map((triviaQuestion) => {
    const question = parseHtml(triviaQuestion.question);
    const answer = parseHtml(triviaQuestion.correct_answer);
    const shuffledChoices = shuffleChoices([
      ...triviaQuestion.incorrect_answers,
      answer,
    ]);
    const choices = shuffledChoices.map(parseHtml);

    return {
      question,
      answer,
      choices,
    };
  });
}
