import { Component, Input, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Question } from "./Types";
import { gameScreenUtils } from "./GameScreenUtils";
import { SpinnerComponent } from "./spinner/spinner.component";

@Component({
  selector: "app-gamescreen",
  standalone: true,
  imports: [CommonModule, SpinnerComponent],
  templateUrl: "./game-screen.component.html",
  styleUrl: "./game-screen.component.css",
})
export class GameScreenComponent implements OnInit {
  private timerValue: number = 0;
  private timerInterval: any;
  protected numberOfCorrectAnswers: number = 0;
  protected questionCounter: number = 1;
  protected questionSet: Question[] = [];
  protected currentQuestion: Question = {
    question: "",
    answer: "",
    choices: [],
  };
  protected gameEnd: boolean = false;
  protected endTime: string = "";

  @Input() category: string | undefined;
  @Input() username: string | undefined;

  evaluate(label: HTMLElement): void {
    const choice: string | undefined = label.textContent?.trim();
    this.questionSet[this.questionCounter - 1].userChoice = choice;
    if (choice && this.questionCounter <= this.questionSet.length) {
      if (choice === this.currentQuestion.answer) {
        this.numberOfCorrectAnswers += 1;
      }
      if (this.questionCounter < this.questionSet.length) {
        this.questionCounter += 1;
        this.currentQuestion = this.questionSet[this.questionCounter - 1];
      } else {
        this.endTime = this.formatTimer();
        clearInterval(this.timerInterval);
        this.gameEnd = true;
      }
    }
  }

  ngOnInit(): void {
    gameScreenUtils
      .getTriviaQuestions()
      .then((questions) => {
        this.questionSet = questions;
        this.currentQuestion = this.questionSet[this.questionCounter - 1];
        this.startTimer();
      })
      .catch((e) => console.error(e));
  }

  startTimer(): void {
    this.timerValue = 0;
    this.timerInterval = setInterval(() => {
      this.timerValue++;
    }, 1000);
  }

  formatTimer(): string {
    const hours = Math.floor(this.timerValue / 3600);
    const minutes = Math.floor((this.timerValue % 3600) / 60);
    const seconds = this.timerValue % 60;

    return `${this.padZero(hours)}:${this.padZero(minutes)}:${this.padZero(seconds)}`;
  }

  padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  ngOnDestroy(): void {
    clearInterval(this.timerInterval);
  }
}
