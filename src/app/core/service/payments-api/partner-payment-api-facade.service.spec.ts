import { TestBed } from '@angular/core/testing';

import { PartnerPaymentApiFacadeService } from './partner-payment-api-facade.service';

describe('PartnerPaymentApiFacadeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PartnerPaymentApiFacadeService = TestBed.get(PartnerPaymentApiFacadeService);
    expect(service).toBeTruthy();
  });
});
