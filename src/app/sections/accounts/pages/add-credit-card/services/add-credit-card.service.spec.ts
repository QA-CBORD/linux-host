import { TestBed } from '@angular/core/testing';
import { CommerceApiService } from 'src/app/core/service/commerce/commerce-api.service';
import { AddCreditCardService } from './add-credit-card.service';

describe('AddCreditCardService', () => {
  let service: AddCreditCardService;

  beforeEach(() => {
    const commerceApiServiceStub = () => ({
      createAccount: accountInfo => ({})
    });
    TestBed.configureTestingModule({
      providers: [
        AddCreditCardService,
        { provide: CommerceApiService, useFactory: commerceApiServiceStub }
      ]
    });
    service = TestBed.inject(AddCreditCardService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
