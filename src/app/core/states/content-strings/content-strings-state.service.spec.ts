import { TestBed } from '@angular/core/testing';

import { ContentStringsStateService } from './content-strings-state.service';

describe('ContentStringsStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContentStringsStateService = TestBed.get(ContentStringsStateService);
    expect(service).toBeTruthy();
  });
});
