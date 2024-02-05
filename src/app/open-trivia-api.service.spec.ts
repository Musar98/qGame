import { TestBed } from '@angular/core/testing';

import { OpenTriviaApiService } from './open-trivia-api.service';

describe('OpenTriviaApiService', () => {
  let service: OpenTriviaApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenTriviaApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
