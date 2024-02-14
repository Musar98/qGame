export interface Question {
  question: string;
  answer: string;
  choices: string[];
  userChoice?: string;
}
