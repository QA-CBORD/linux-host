import { TestBed } from '@angular/core/testing';
import { RoomsStateService } from './rooms-state.service';

describe('RoomsStateService', () => {
  let service: RoomsStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [RoomsStateService] });
    service = TestBed.inject(RoomsStateService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
