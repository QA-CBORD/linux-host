import { ChangeDetectorRef, Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { OrderingService } from '@sections/ordering/services/ordering.service';
import { ORDERING_CONTENT_STRINGS } from '@sections/ordering/ordering.config';
import { take } from 'rxjs/operators';

@Pipe({
  name: 'priceUnitsResolver',
  pure: false,
})
export class PriceUnitsResolverPipe implements PipeTransform {
  private singleMealUnit = 'meal';
  private pluralMealUnit = 'meals';

  constructor(private readonly currencyPipe: CurrencyPipe,
              private readonly orderingService: OrderingService) {
    this.updateMealStringUnits();
  }

  transform(value: number, mealBased = false): string {
    return mealBased
      ? `${value} ${value === 1 ? this.singleMealUnit : this.pluralMealUnit}`
      : this.currencyPipe.transform(value);
  }

  private async updateMealStringUnits() {
    this.singleMealUnit =
      await this.orderingService.getContentStringByName(ORDERING_CONTENT_STRINGS.labelMealSuffix)
        .pipe(take(1)).toPromise();
    this.pluralMealUnit =
      await this.orderingService.getContentStringByName(ORDERING_CONTENT_STRINGS.mealSuffixPlural)
        .pipe(take(1)).toPromise();
  }
}
