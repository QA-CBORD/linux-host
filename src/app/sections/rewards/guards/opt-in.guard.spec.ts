import { TestBed, inject, waitForAsync } from '@angular/core/testing';

import { OptInGuard } from './opt-in.guard';

describe('OptInGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OptInGuard],
    });
  });

  it('should ...', inject([OptInGuard], (guard: OptInGuard) => {
    expect(guard).toBeTruthy();
  }));
});
