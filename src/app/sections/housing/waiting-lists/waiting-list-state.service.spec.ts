import { TestBed } from '@angular/core/testing';
import { WaitingListDetails } from './waiting-lists.model';
import { WaitingListStateService } from './waiting-list-state.service';

describe('WaitingListStateService', () => {
  let service: WaitingListStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [WaitingListStateService] });
    service = TestBed.inject(WaitingListStateService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
