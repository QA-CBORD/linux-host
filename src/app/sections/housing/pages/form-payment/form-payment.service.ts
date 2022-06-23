import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAccount } from '@core/model/account/account.model';
import { LOCAL_ROUTING } from '@sections/housing/housing.config';
import { CreditCardService } from '@sections/settings/creditCards/credit-card.service';
import { PATRON_NAVIGATION } from 'src/app/app.global';

export enum FormType  {
  Application = 'application',
  WorkOrder = 'work-order'
}

@Injectable()
export class FormPaymentService {

  constructor(private readonly creditCardService: CreditCardService,  private _router: Router) {}

  async continueToPayment(formDetails: any, form: FormControl, key: string, formType: FormType ) {
    const userAccounts = await this.creditCardService.retrieveAccounts();
    await this.openFormPayment(userAccounts, formDetails, form, key, formType);
  }

  private async openFormPayment(userAccounts: { display: string; account: UserAccount, iconSrc: string }[], appDetails: any, form: FormControl, key: string, formType: FormType) {
    await this._router.navigate([`${PATRON_NAVIGATION.housing}/${LOCAL_ROUTING.formPayment}`], { state: { userAccounts, currentForm: { details: appDetails, formValue: form, key, type: formType, isSubmitted: false }} } );
  }
}
