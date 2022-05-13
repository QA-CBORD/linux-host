import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommerceApiService } from 'src/app/core/service/commerce/commerce-api.service';
import { AccountCreationInfo } from '../models/account-creation-info';
import {
  MASTERCARD_REGEXP, EXPRTN_DATE_1_REGEXP, EXPRTN_DATE_2_REGEXP, EXPRTN_DATE_3_REGEXP, EXPRTN_DATE_4_REGEXP, EXPRTN_DATE_5_REGEXP, EXPRTN_DATE_6_REGEXP, EXPRTN_DATE_7_REGEXP, EXPRTN_DATE_8_REGEXP,
 
} from '@core/utils/regexp-patterns';

@Injectable()
export class AddCreditCardService {
  constructor(private readonly commerceApiService: CommerceApiService) {}

  getCardType(number): string {
    // visa
    const re = new RegExp('^4');
    if (number.match(re) != null) return 'Visa';

    // Mastercard
    if (MASTERCARD_REGEXP.test(number)) return 'MasterCard';

    return '';
  }

  formatExpirationDate(string): string {
    return string
      .replace(EXPRTN_DATE_1_REGEXP, '0$1/')
      .replace(EXPRTN_DATE_2_REGEXP, '$1/')
      .replace(EXPRTN_DATE_3_REGEXP, '0$1/$2')
      .replace(EXPRTN_DATE_4_REGEXP, '0$1/$2')
      .replace(EXPRTN_DATE_5_REGEXP, '$1/$2')
      .replace(EXPRTN_DATE_6_REGEXP, '0')
      .replace(EXPRTN_DATE_7_REGEXP, '')
      .replace(EXPRTN_DATE_8_REGEXP, '/');
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
