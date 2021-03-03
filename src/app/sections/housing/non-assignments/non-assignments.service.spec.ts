import { TestBed } from '@angular/core/testing';

import { NonAssignmentsService } from './non-assignments.service';

describe('NonAssignmentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NonAssignmentsService = TestBed.get(NonAssignmentsService);
    expect(service).toBeTruthy();
  });
});
