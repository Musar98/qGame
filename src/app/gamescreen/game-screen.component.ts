import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Question } from "./Types";
import { gameScreenUtils } from "./Utils";
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
  private currentSolution: string = "";
  protected currentQuestion: string = "";

  evaluate(label: HTMLElement): void {
    const choice: string | null = label.textContent;

    if (choice && this.questionCounter < this.questionSet.length) {
      if (choice === this.currentSolution) {
        this.numberOfCorrectAnswers += 1;
      }
      this.questionCounter += 1;
      this.currentQuestion =
        this.questionSet[this.questionCounter - 1]?.question || "";
      this.currentSolution =
        this.questionSet[this.questionCounter - 1]?.answer || "";
    }
  }

  ngOnInit(): void {
    gameScreenUtils
      .getTriviaQuestions()
      .then((questions) => {
        setTimeout(() => {
          this.questionSet = questions;
          this.currentQuestion =
            this.questionSet[this.questionCounter - 1].question;
          this.currentSolution =
            this.questionSet[this.questionCounter - 1].answer;
        }, 3000);
        this.startTimer();
      })
      .catch((e) => e);
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
