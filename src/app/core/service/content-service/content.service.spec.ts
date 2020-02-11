import { TestBed } from '@angular/core/testing';

import { ContentStringsApiService } from './content-strings-api.service';

describe('ContentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContentStringsApiService = TestBed.get(ContentStringsApiService);
    expect(service).toBeTruthy();
  });
});
