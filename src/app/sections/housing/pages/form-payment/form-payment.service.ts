import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from '@core/service/loading/loading.service';
import { ApplicationsService } from '@sections/housing/applications/applications.service';
import { LOCAL_ROUTING } from '@sections/housing/housing.config';
import { AccountsConf, CreditCardService } from '@sections/settings/creditCards/credit-card.service';
import { take } from 'rxjs/operators';
import { PATRON_NAVIGATION } from 'src/app/app.global';
import { CurrentForm } from './form-payment.component';

export enum FormType {
  Application = 'application',
  WorkOrder = 'work-order',
}
@Injectable()
export class FormPaymentService {
  constructor(
    private readonly _router: Router,
    private readonly _loadingService: LoadingService,
    private readonly creditCardService: CreditCardService,
    private readonly applicationsService: ApplicationsService
  ) {}

  async continueToFormPayment(currentForm: CurrentForm) {
    this._loadingService.showSpinner();
    const userAccounts = await this.creditCardService.retrieveAccounts();
    if (currentForm.type == FormType.Application) {
      this.applicationsService
        .saveApplication(currentForm, false)
        .pipe(take(1))
        .subscribe(() => this.navigateToFormPayment(userAccounts, currentForm));
    } else {
      this.navigateToFormPayment(userAccounts, currentForm);
    }
  }

  private navigateToFormPayment(userAccounts: AccountsConf[], currentForm: CurrentForm) {
    this._router.navigate([`${PATRON_NAVIGATION.housing}/${LOCAL_ROUTING.formPayment}`], {
      state: {
        userAccounts,
        currentForm,
      },
    });
  }
}
