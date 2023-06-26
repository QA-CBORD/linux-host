import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';
import { DashboardPage } from '@sections/dashboard/dashboard.component';
import { SwipeBackGuard } from './swipe-back.guard';

describe('SwipeBackGuard', () => {
  let service: SwipeBackGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [SwipeBackGuard] });
    service = TestBed.inject(SwipeBackGuard);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
