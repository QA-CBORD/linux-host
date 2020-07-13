import { TestBed } from '@angular/core/testing';

import { ExternalPaymentService } from './external-payment.service';

describe('ExternalPaymentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExternalPaymentService = TestBed.get(ExternalPaymentService);
    expect(service).toBeTruthy();
  });
});
