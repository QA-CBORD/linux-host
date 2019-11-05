import { TestBed } from '@angular/core/testing';

import { ApplicationsStateService } from './applications-state.service';

describe('ApplicationsStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApplicationsStateService = TestBed.get(ApplicationsStateService);
    expect(service).toBeTruthy();
  });
});
