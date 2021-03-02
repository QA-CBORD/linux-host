import { TestBed } from '@angular/core/testing';

import { NonAssignmentsStateService } from './non-assignments-state.service';

describe('NonAssignmentsState.Service.TsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NonAssignmentsStateService = TestBed.get(NonAssignmentsStateService);
    expect(service).toBeTruthy();
  });
});
