import { TestBed } from '@angular/core/testing';

import { RoomsStateService } from './rooms-state.service';

describe('RoomsStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RoomsStateService = TestBed.get(RoomsStateService);
    expect(service).toBeTruthy();
  });
});