import { TestBed } from '@angular/core/testing';

import { MealDonationsService } from './meal-donations.service';

describe('MealDonationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MealDonationsService = TestBed.get(MealDonationsService);
    expect(service).toBeTruthy();
  });
});
