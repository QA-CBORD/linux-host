import { TestBed } from '@angular/core/testing';

import { ContentStringsFacadeService } from './content-strings.facade.service';

describe('ContentStrings.FacadeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContentStringsFacadeService = TestBed.get(ContentStringsFacadeService);
    expect(service).toBeTruthy();
  });
});
