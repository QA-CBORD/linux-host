import { TestBed } from '@angular/core/testing';

import { PartnerPaymentApiService } from './partner-payment-api.service';

describe('PartnerPaymentApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PartnerPaymentApiService = TestBed.get(PartnerPaymentApiService);
    expect(service).toBeTruthy();
  });
});
