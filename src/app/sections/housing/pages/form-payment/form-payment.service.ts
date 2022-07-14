import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingService } from '@core/service/loading/loading.service';
import { ApplicationsService } from '@sections/housing/applications/applications.service';
import { LOCAL_ROUTING } from '@sections/housing/housing.config';
import { CreditCardService } from '@sections/settings/creditCards/credit-card.service';
import { take } from 'rxjs/operators';
import { PATRON_NAVIGATION } from 'src/app/app.global';

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

  async continueToFormPayment(formDetails: any, form: FormControl, key: string, formType: FormType) {
    this._loadingService.showSpinner();
    if (formDetails.type == FormType.Application) {
      this.applicationsService
        .saveApplication(formDetails)
        .pipe(take(1))
        .subscribe();
    }
    const userAccounts = await this.creditCardService.retrieveAccounts();
    await this._router.navigate([`${PATRON_NAVIGATION.housing}/${LOCAL_ROUTING.formPayment}`], {
      state: {
        userAccounts,
        currentForm: { details: formDetails, formValue: form, key, type: formType, isSubmitted: false },
      },
    });
  }
}
