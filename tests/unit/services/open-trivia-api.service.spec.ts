import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { OpenTriviaApiService } from '../../../src/app/services/open-trivia-api.service';
import { makeTriviaQuestion } from '../../helpers/trivia-factories';

describe('OpenTriviaApiService', () => {
  let service: OpenTriviaApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(OpenTriviaApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch multiple-choice questions', async () => {
    const payload = { response_code: 0, results: [makeTriviaQuestion()] };
    const promise = service.getQuestions();

    const request = httpMock.expectOne((req) => req.url === 'https://opentdb.com/api.php');
    expect(request.request.method).toBe('GET');
    expect(request.request.params.get('type')).toBe('multiple');
    expect(request.request.params.get('amount')).toBe('50');
    request.flush(payload);

    await expectAsync(promise).toBeResolvedTo(payload);
  });

  it('should include the category when one is provided', async () => {
    const payload = { response_code: 0, results: [makeTriviaQuestion()] };
    const promise = service.getQuestions(50, 9);

    const request = httpMock.expectOne((req) => req.url === 'https://opentdb.com/api.php');
    expect(request.request.params.get('category')).toBe('9');
    request.flush(payload);

    await expectAsync(promise).toBeResolvedTo(payload);
  });

  it('should return undefined when fetching questions fails', async () => {
    const promise = service.getQuestions();

    const request = httpMock.expectOne((req) => req.url === 'https://opentdb.com/api.php');
    request.error(new ProgressEvent('Network error'));

    await expectAsync(promise).toBeResolvedTo(undefined);
  });

  it('should fetch categories', async () => {
    const payload = {
      trivia_categories: [{ id: 9, name: 'General Knowledge' }],
    };
    const promise = service.getCategories();

    const request = httpMock.expectOne('https://opentdb.com/api_category.php');
    expect(request.request.method).toBe('GET');
    request.flush(payload);

    await expectAsync(promise).toBeResolvedTo(payload);
  });

  it('should return undefined when fetching categories fails', async () => {
    const promise = service.getCategories();

    const request = httpMock.expectOne('https://opentdb.com/api_category.php');
    request.error(new ProgressEvent('Network error'));

    await expectAsync(promise).toBeResolvedTo(undefined);
  });
});
