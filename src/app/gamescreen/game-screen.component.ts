import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {Question} from "./Types";
import {DEMO_QUESTIONS} from "./Constants";


@Component({
  selector: 'app-gamescreen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-screen.component.html',
  styleUrl: './game-screen.component.css'
})


export class GameScreenComponent implements OnInit {
  private timerValue: number = 0;
  private timerInterval: any;
  private numberOfCorrectAnswers: number = 0;
  protected questionCounter: number = 1;
  protected questionSetDEMO: Question[] = DEMO_QUESTIONS;
  private currentSolution: string = this.questionSetDEMO[this.questionCounter - 1].answer;
  protected currentQuestion: string = this.questionSetDEMO[this.questionCounter - 1].question;

  @Input() questions: any;


  evaluate(label: HTMLElement): void {
    const choice: string | null = label.textContent;

    if (choice && this.questionCounter < this.questionSetDEMO.length) {
      if (choice === this.currentSolution) {
        this.numberOfCorrectAnswers += 1;
      }
      this.questionCounter += 1;
      this.currentQuestion = this.questionSetDEMO[this.questionCounter - 1]?.question || '';
      this.currentSolution = this.questionSetDEMO[this.questionCounter - 1]?.answer || '';
    }
  }


  ngOnInit(): void {
    //todo continue remove log and work further with questions
    console.log(this.questions)
    this.startTimer();
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
