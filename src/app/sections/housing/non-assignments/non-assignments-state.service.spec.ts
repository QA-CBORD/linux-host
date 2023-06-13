import { TestBed } from '@angular/core/testing';
import { NonAssignmentDetails } from './non-assignments.model';
import { NonAssignmentListDetails } from './non-assignments.model';
import { NonAssignmentsStateService } from './non-assignments-state.service';

describe('NonAssignmentsStateService', () => {
  let service: NonAssignmentsStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [NonAssignmentsStateService] });
    service = TestBed.inject(NonAssignmentsStateService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
