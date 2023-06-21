import { TestBed } from '@angular/core/testing';
import { CheckInOutSpot } from './check-in-out.model';
import { CheckInOutStateService } from './check-in-out-state.service';

describe('CheckInOutStateService', () => {
  let service: CheckInOutStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [CheckInOutStateService] });
    service = TestBed.inject(CheckInOutStateService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
