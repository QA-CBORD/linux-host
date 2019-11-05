import { TestBed } from '@angular/core/testing';

import { QuestionsStorageService } from './questions-storage.service';

describe('QuestionsStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuestionsStorageService = TestBed.get(QuestionsStorageService);
    expect(service).toBeTruthy();
  });
});
