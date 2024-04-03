import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { ORDERING_CONTENT_STRINGS } from '@sections/ordering/ordering.config';
import { take } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'priceUnitsResolver',
  pure: false,
})
export class PriceUnitsResolverPipe implements PipeTransform {
  private singleMealUnit = 'meal';
  private pluralMealUnit = 'meals';

  constructor(private readonly currencyPipe: CurrencyPipe, private readonly translateService: TranslateService) {
    this.updateMealStringUnits();
  }

  transform(value: number, mealBased = false): string {
    return mealBased
      ? `${value} ${value === 1 ? this.singleMealUnit : this.pluralMealUnit}`
      : this.currencyPipe.transform(value);
  }

  private async updateMealStringUnits() {
    this.singleMealUnit = this.translateService.instant(ORDERING_CONTENT_STRINGS.labelMealSuffix);
    this.pluralMealUnit = this.translateService.instant(ORDERING_CONTENT_STRINGS.mealSuffixPlural);
  }
}
