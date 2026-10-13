import { TestBed } from '@angular/core/testing';
import { provideHttpClient, withXhr } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import {
  GameScreenUtils,
  decodeHtml,
  remapTriviaQuestions,
  shuffleChoices,
} from '../../../src/app/gamescreen/game-screen.utils';
import { DEMO_QUESTIONS } from '../../../src/app/gamescreen/demo-questions.constants';
import { makeTriviaQuestion } from '../../helpers/trivia-factories';

describe('shuffleChoices', () => {
  it('should return a new array with the same members', () => {
    const input = ['a', 'b', 'c', 'd'];
    const shuffled = shuffleChoices(input);
    expect(shuffled).not.toBe(input);
    expect([...shuffled].sort()).toEqual([...input].sort());
  });

  it('should handle an empty array', () => {
    expect(shuffleChoices([])).toEqual([]);
  });
});

describe('decodeHtml', () => {
  it('should decode HTML entities', () => {
    expect(decodeHtml('Tom &amp; Jerry')).toBe('Tom & Jerry');
    expect(decodeHtml('&#039;quoted&#039;')).toBe("'quoted'");
  });
});

describe('remapTriviaQuestions', () => {
  it('should decode entities and keep every choice exactly once', () => {
    const [remapped] = remapTriviaQuestions([
      makeTriviaQuestion({
        question: 'Tom &amp; Jerry?',
        correct_answer: 'Yes &amp; no',
        incorrect_answers: ['a', 'b', 'c'],
      }),
    ]);

    expect(remapped.question).toBe('Tom & Jerry?');
    expect(remapped.answer).toBe('Yes & no');
    expect(remapped.choices).toHaveSize(4);
    expect(remapped.choices).toContain(remapped.answer);
    expect(new Set(remapped.choices).size).toBe(4);
  });
});

describe('GameScreenUtils', () => {
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(withXhr()), provideHttpClientTesting()],
    });
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should remap API questions', async () => {
    const utils = TestBed.inject(GameScreenUtils);
    const promise = utils.getTriviaQuestions();

    const request = httpMock.expectOne((req) => req.url === 'https://opentdb.com/api.php');
    request.flush({ response_code: 0, results: [makeTriviaQuestion()] });

    const questions = await promise;
    expect(questions).toHaveSize(1);
    expect(questions[0].answer).toBe('Paris');
    expect(questions[0].choices).toContain('Paris');
  });

  it('should fall back to demo questions when the API is unreachable', async () => {
    const utils = TestBed.inject(GameScreenUtils);
    const promise = utils.getTriviaQuestions();

    const request = httpMock.expectOne((req) => req.url === 'https://opentdb.com/api.php');
    request.error(new ProgressEvent('Network error'));

    const questions = await promise;
    expect(questions.length).toBe(DEMO_QUESTIONS.length);
    expect(questions[0]).toEqual(
      jasmine.objectContaining({ question: DEMO_QUESTIONS[0].question }),
    );
  });

  it('should forward the category id to the API', async () => {
    const utils = TestBed.inject(GameScreenUtils);
    const promise = utils.getTriviaQuestions(9);

    const request = httpMock.expectOne((req) => req.url === 'https://opentdb.com/api.php');
    expect(request.request.params.get('category')).toBe('9');
    request.flush({ response_code: 0, results: [makeTriviaQuestion()] });

    await promise;
  });

  it('should forward the requested amount to the API', async () => {
    const utils = TestBed.inject(GameScreenUtils);
    const promise = utils.getTriviaQuestions(undefined, 10);

    const request = httpMock.expectOne((req) => req.url === 'https://opentdb.com/api.php');
    expect(request.request.params.get('amount')).toBe('10');
    request.flush({ response_code: 0, results: [makeTriviaQuestion()] });

    await promise;
  });

  it('should limit the demo fallback to the requested amount', async () => {
    const utils = TestBed.inject(GameScreenUtils);
    const promise = utils.getTriviaQuestions(undefined, 10);

    const request = httpMock.expectOne((req) => req.url === 'https://opentdb.com/api.php');
    request.error(new ProgressEvent('Network error'));

    const questions = await promise;
    expect(questions.length).toBe(10);
  });
});
