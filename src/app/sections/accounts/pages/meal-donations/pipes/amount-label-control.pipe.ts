import { Pipe, PipeTransform } from '@angular/core';
import { MealDonationsService } from '@sections/accounts/pages/meal-donations/service/meal-donations.service';
import { ACCOUNT_TYPES } from '@sections/accounts/accounts.config';
import { iif, Observable } from 'rxjs';
import { MEAL_CONTENT_STRINGS } from '@sections/accounts/pages/meal-donations/meal-donation.config';

@Pipe({
  name: 'amountLabelControl',
})
export class AmountLabelControlPipe implements PipeTransform {
  amountLabelControl$: Observable<string>;
  amountMealsLabelControl$: Observable<string>;

  constructor(private readonly donationsService: MealDonationsService) {
    this.amountLabelControl$ =
      this.donationsService.getMealsDonationContentStringByName$(MEAL_CONTENT_STRINGS.amountToDonate);
    this.amountMealsLabelControl$ =
      this.donationsService.getMealsDonationContentStringByName$(MEAL_CONTENT_STRINGS.labelMealsToDonate);
  }

  transform(value: ACCOUNT_TYPES): Observable<string> {
    return iif(
      () => Number(value) === ACCOUNT_TYPES.meals,
      this.amountMealsLabelControl$,
      this.amountLabelControl$,
    );
  }
}
