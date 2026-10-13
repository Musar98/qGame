import {
  ChangeDetectorRef,
  Component,
  NgZone,
  OnDestroy,
  OnInit,
  computed,
  inject,
  input,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import { GameScreenUtils } from './game-screen.utils';
import { SpinnerComponent } from './spinner/spinner.component';
import type { Question } from './types';

export function padZero(value: number): string {
  return value < 10 ? `0${value}` : `${value}`;
}

export function formatDuration(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
}

@Component({
  selector: 'app-gamescreen',
  imports: [SpinnerComponent],
  templateUrl: './game-screen.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './game-screen.component.css',
})
export class GameScreenComponent implements OnInit, OnDestroy {
  readonly categoryId = input<number | undefined>(undefined);
  readonly username = input<string>('Guest');
  readonly questionCount = input<number>(50);

  private readonly gameScreenUtils = inject(GameScreenUtils);
  private readonly ngZone = inject(NgZone);
  private readonly cdr = inject(ChangeDetectorRef);
  private timerId?: ReturnType<typeof setInterval>;

  readonly questionSet = signal<Question[]>([]);
  readonly currentIndex = signal(0);
  readonly correctCount = signal(0);
  readonly elapsedSeconds = signal(0);
  readonly isLoading = signal(true);
  readonly loadFailed = signal(false);
  readonly gameEnd = signal(false);
  readonly endTime = signal('');

  readonly currentQuestion = computed<Question | undefined>(
    () => this.questionSet()[this.currentIndex()],
  );
  readonly formattedTimer = computed(() => formatDuration(this.elapsedSeconds()));
  readonly questionNumber = computed(() => this.currentIndex() + 1);

  ngOnInit(): void {
    void this.loadQuestions();
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }

  async loadQuestions(): Promise<void> {
    this.isLoading.set(true);
    this.loadFailed.set(false);
    try {
      const questions = await this.gameScreenUtils.getTriviaQuestions(
        this.categoryId(),
        this.questionCount(),
      );
      this.questionSet.set(questions);
      this.startTimer();
    } catch {
      this.loadFailed.set(true);
    } finally {
      this.isLoading.set(false);
    }
  }

  retry(): void {
    this.resetState();
    void this.loadQuestions();
  }

  evaluate(choice: string): void {
    const questions = this.questionSet();
    const index = this.currentIndex();
    const current = questions[index];
    if (!current || this.gameEnd()) {
      return;
    }

    const normalizedChoice = choice.trim();
    if (!normalizedChoice) {
      return;
    }

    const updated: Question = { ...current, userChoice: normalizedChoice };
    const nextSet = [...questions];
    nextSet[index] = updated;
    this.questionSet.set(nextSet);

    if (normalizedChoice === current.answer) {
      this.correctCount.update((count) => count + 1);
    }

    if (index < questions.length - 1) {
      this.currentIndex.update((i) => i + 1);
    } else {
      this.endTime.set(formatDuration(this.elapsedSeconds()));
      this.clearTimer();
      this.gameEnd.set(true);
    }
  }

  private startTimer(): void {
    this.clearTimer();
    this.elapsedSeconds.set(0);
    // Run outside Angular so the periodic tick neither triggers a full
    // change-detection cycle on its own nor blocks NgZone stability
    // (unit tests, e2e testability). The view is refreshed explicitly.
    this.ngZone.runOutsideAngular(() => {
      this.timerId = setInterval(() => {
        this.elapsedSeconds.update((seconds) => seconds + 1);
        this.cdr.detectChanges();
      }, 1000);
    });
  }

  private clearTimer(): void {
    if (this.timerId !== undefined) {
      clearInterval(this.timerId);
      this.timerId = undefined;
    }
  }

  private resetState(): void {
    this.clearTimer();
    this.questionSet.set([]);
    this.currentIndex.set(0);
    this.correctCount.set(0);
    this.elapsedSeconds.set(0);
    this.gameEnd.set(false);
    this.endTime.set('');
  }
}
