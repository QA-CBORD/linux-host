import { Pipe, PipeTransform } from '@angular/core';
import { MealDonationsService } from '@sections/accounts/pages/meal-donations/service/meal-donations.service';
import { ACCOUNT_TYPES } from '@sections/accounts/accounts.config';
import { iif, Observable } from 'rxjs';
import { CONTENT_STRING_NAMES } from '@sections/accounts/pages/meal-donations/content-strings';

@Pipe({
  name: 'amountLabelControl',
})
export class AmountLabelControlPipe implements PipeTransform {
  amountLabelControl$: Observable<string>;
  amountMealsLabelControl$: Observable<string>;

  constructor(private readonly donationsService: MealDonationsService) {
    this.amountLabelControl$ =
      this.donationsService.getMealsDonationContentStringByName$(CONTENT_STRING_NAMES.amountToDonate);
    this.amountMealsLabelControl$ =
      this.donationsService.getMealsDonationContentStringByName$(CONTENT_STRING_NAMES.labelMealsToDonate);
  }

  transform(value: ACCOUNT_TYPES): Observable<string> {
    return iif(
      () => Number(value) === ACCOUNT_TYPES.meals,
      this.amountMealsLabelControl$,
      this.amountLabelControl$,
    );
  }
}
