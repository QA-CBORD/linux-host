import { TestBed } from '@angular/core/testing';

import { FormPaymentService } from './form-payment.service';

describe('FormPaymentService', () => {
  let service: FormPaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormPaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
