import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  GameScreenComponent,
  formatDuration,
  padZero,
} from '../../../src/app/gamescreen/game-screen.component';
import { GameScreenUtils } from '../../../src/app/gamescreen/game-screen.utils';
import { makeQuestion } from '../../helpers/trivia-factories';

describe('format helpers', () => {
  it('padZero should left-pad single digits', () => {
    expect(padZero(0)).toBe('00');
    expect(padZero(9)).toBe('09');
    expect(padZero(10)).toBe('10');
  });

  it('formatDuration should format hours, minutes and seconds', () => {
    expect(formatDuration(0)).toBe('00:00:00');
    expect(formatDuration(61)).toBe('00:01:01');
    expect(formatDuration(3661)).toBe('01:01:01');
  });
});

describe('GameScreenComponent', () => {
  let fixture: ComponentFixture<GameScreenComponent>;
  let component: GameScreenComponent;
  let getTriviaQuestions: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    getTriviaQuestions = vi.fn();
    await TestBed.configureTestingModule({
      imports: [GameScreenComponent],
      providers: [{ provide: GameScreenUtils, useValue: { getTriviaQuestions } }],
    }).compileComponents();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  async function createComponent() {
    fixture = TestBed.createComponent(GameScreenComponent);
    fixture.componentRef.setInput('username', 'Ada');
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  }

  it('should create and load questions', async () => {
    getTriviaQuestions.mockResolvedValue([makeQuestion(), makeQuestion({ question: 'Second?' })]);
    await createComponent();

    expect(component).toBeTruthy();
    expect(component.questionSet().length).toBe(2);
    expect(component.currentQuestion()?.question).toContain('capital of France');
    expect(component.isLoading()).toBe(false);
  });

  it('should request 50 questions by default', async () => {
    getTriviaQuestions.mockResolvedValue([makeQuestion()]);
    await createComponent();

    expect(getTriviaQuestions).toHaveBeenCalledWith(undefined, 50);
  });

  it('should forward the questionCount input to the loader', async () => {
    getTriviaQuestions.mockResolvedValue([makeQuestion()]);
    fixture = TestBed.createComponent(GameScreenComponent);
    fixture.componentRef.setInput('username', 'Ada');
    fixture.componentRef.setInput('questionCount', 10);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(getTriviaQuestions).toHaveBeenCalledWith(undefined, 10);
  });

  it('should score a correct answer and advance to the next question', async () => {
    getTriviaQuestions.mockResolvedValue([makeQuestion(), makeQuestion({ question: 'Second?' })]);
    await createComponent();

    component.evaluate('Paris');

    expect(component.correctCount()).toBe(1);
    expect(component.questionNumber()).toBe(2);
    expect(component.gameEnd()).toBe(false);
  });

  it('should show the username in the final score', async () => {
    getTriviaQuestions.mockResolvedValue([makeQuestion()]);
    await createComponent();

    component.evaluate('Paris');
    fixture.detectChanges();

    expect(component.gameEnd()).toBe(true);
    const heading: HTMLElement = fixture.nativeElement.querySelector('#results-heading');
    expect(heading.textContent).toContain('Ada');
    expect(heading.textContent).toContain('1 / 1');
  });

  it('should not score a wrong answer but still advance', async () => {
    getTriviaQuestions.mockResolvedValue([makeQuestion(), makeQuestion({ question: 'Second?' })]);
    await createComponent();

    component.evaluate('London');

    expect(component.correctCount()).toBe(0);
    expect(component.questionNumber()).toBe(2);
    expect(component.questionSet()[0].userChoice).toBe('London');
  });

  it('should ignore blank choices', async () => {
    getTriviaQuestions.mockResolvedValue([makeQuestion(), makeQuestion({ question: 'Second?' })]);
    await createComponent();

    component.evaluate('   ');
    expect(component.questionNumber()).toBe(1);
    expect(component.correctCount()).toBe(0);
  });

  it('should end the game after the last question', async () => {
    getTriviaQuestions.mockResolvedValue([makeQuestion()]);
    await createComponent();

    component.evaluate('Paris');

    expect(component.gameEnd()).toBe(true);
    expect(component.endTime()).toMatch(/^\d{2}:\d{2}:\d{2}$/);
  });

  it('should tick the timer every second', async () => {
    vi.useFakeTimers();
    getTriviaQuestions.mockResolvedValue([makeQuestion()]);
    fixture = TestBed.createComponent(GameScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(component.elapsedSeconds()).toBe(0);
    await vi.advanceTimersByTimeAsync(3000);
    expect(component.elapsedSeconds()).toBe(3);
  });

  it('should show an error state with retry when loading fails', async () => {
    getTriviaQuestions.mockRejectedValue(new Error('offline'));
    await createComponent();

    expect(component.loadFailed()).toBe(true);
    expect(fixture.nativeElement.querySelector('.error-state')).toBeTruthy();

    getTriviaQuestions.mockResolvedValue([makeQuestion()]);
    component.retry();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(component.questionSet().length).toBe(1);
    expect(component.loadFailed()).toBe(false);
  });
});
