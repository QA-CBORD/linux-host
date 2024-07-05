import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { ORDERING_CONTENT_STRINGS } from '@sections/ordering/ordering.config';
import { TranslateService } from '@ngx-translate/core';
import { CONTENT_STRINGS_CATEGORIES, CONTENT_STRINGS_DOMAINS } from 'src/app/content-strings';

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

  transform(value: number, mealBased = false, ignoreZeros = false): string {
    return mealBased
      ? `${value} ${value === 1 ? this.singleMealUnit : this.pluralMealUnit}`
      : ignoreZeros && value === 0
      ? ''
      : this.currencyPipe.transform(value);
  }

  private async updateMealStringUnits() {
    this.singleMealUnit = this.translateService.instant(
      [
        CONTENT_STRINGS_DOMAINS.patronUi,
        CONTENT_STRINGS_CATEGORIES.ordering,
        ORDERING_CONTENT_STRINGS.labelMealSuffix,
      ].join('.')
    );
    this.pluralMealUnit = this.translateService.instant(
      [
        CONTENT_STRINGS_DOMAINS.patronUi,
        CONTENT_STRINGS_CATEGORIES.ordering,
        ORDERING_CONTENT_STRINGS.mealSuffixPlural,
      ].join('.')
    );
  }
}
