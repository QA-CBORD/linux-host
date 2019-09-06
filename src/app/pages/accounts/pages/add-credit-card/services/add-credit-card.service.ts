import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommerceApiService } from 'src/app/core/service/commerce/commerce-api.service';
import { AccountCreationInfo } from '../models/account-creation-info';

@Injectable()
export class AddCreditCardService {
  constructor(private readonly commerceApiService: CommerceApiService) {}

  getCardType(number): string {
    // visa
    var re = new RegExp('^4');
    if (number.match(re) != null) return 'Visa';

    // Mastercard
    if (
      /^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(number)
    )
      return 'MasterCard';

    return '';
  }

  formatExpirationDate(string): string {
    return string
      .replace(/^([1-9]\/|[2-9])$/g, '0$1/')
      .replace(/^(0[1-9]{1}|1[0-2]{1})$/g, '$1/')
      .replace(/^([0-1]{1})([3-9]{1})$/g, '0$1/$2')
      .replace(/^(\d)\/(\d\d)$/g, '0$1/$2')
      .replace(/^(0?[1-9]{1}|1[0-2]{1})([0-9]{2})$/g, '$1/$2')
      .replace(/^([0]{1,})\/|[0]{1,}$/g, '0')
      .replace(/[^\d\/]|^[\/]{0,}$/g, '')
      .replace(/\/\//g, '/');
  }

  createAccount(
    accountDisplayName,
    nameOnMedia,
    accountTender,
    mediaValue,
    mediaSecurityCode,
    expirationMonth,
    expirationYear,
    billingAddress
  ): Observable<string> {
    const accountInfo: AccountCreationInfo = {
      accountDisplayName,
      nameOnMedia,
      paymentSystemType: null,
      accountTender,
      mediaValue,
      mediaEntryMethod: 1,
      mediaSecurityCode,
      expirationMonth,
      expirationYear,
      usePatronEmail: false,
      billingAddress,
      externalAccountToken: null,
      externalTransactionToken: null,
    };

    return this.commerceApiService.createAccount(accountInfo);
  }
}
