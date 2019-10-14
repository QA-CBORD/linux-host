import { TestBed } from '@angular/core/testing';

import { AddCreditCardService } from './add-credit-card.service';

describe('AddCreditCardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddCreditCardService = TestBed.get(AddCreditCardService);
    expect(service).toBeTruthy();
  });
});
