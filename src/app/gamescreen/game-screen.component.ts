import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-gamescreen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-screen.component.html',
  styleUrl: './game-screen.component.css'
})

export class GameScreenComponent implements OnInit {
  timerValue: number = 0;
  timerInterval: any;
  questionCounter: number = 1;


  ngOnInit(): void {
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
