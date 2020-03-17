import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, zip } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { MerchantInfo } from '@sections/ordering/shared/models';

import { LoadingService } from 'src/app/core/service/loading/loading.service';
import { MerchantService } from '../services';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { CONTENT_STINGS_CATEGORIES, CONTENT_STINGS_DOMAINS } from '../../../content-strings';
import { ContentStringInfo } from '@core/model/content/content-string-info.model';
import { ORDER_VALIDATION_ERRORS, ORDERING_CONTENT_STRINGS } from '@sections/ordering/ordering.config';

@Injectable()
export class OrderingResolver implements Resolve<Observable<[
  ContentStringInfo[],
  ContentStringInfo[],
  ContentStringInfo[],
  ContentStringInfo[],
  MerchantInfo[]]>> {

  constructor(
    private readonly merchantService: MerchantService,
    private readonly loadingService: LoadingService,
    private readonly contentStringsFacadeService: ContentStringsFacadeService) {
  }

  resolve(): Observable<[ContentStringInfo[], ContentStringInfo[], ContentStringInfo[], ContentStringInfo[], MerchantInfo[]]> {
    const orderingContentStrings = this.updateOrderValidationErrorObject();
    const favouriteMerchant = this.merchantService.getMerchantsWithFavoriteInfo();
    const statesStrings =
      this.contentStringsFacadeService.fetchContentStrings$(
        CONTENT_STINGS_DOMAINS.patronUi,
        CONTENT_STINGS_CATEGORIES.usStates);
    const weekDaysShortForm =
      this.contentStringsFacadeService.fetchContentStrings$(
        CONTENT_STINGS_DOMAINS.patronUi,
        CONTENT_STINGS_CATEGORIES.dayOfWeekAbbreviated);
    const dayMonthShortForm =
      this.contentStringsFacadeService.fetchContentStrings$(
        CONTENT_STINGS_DOMAINS.patronUi,
        CONTENT_STINGS_CATEGORIES.monthAbbreviated);

    this.loadingService.showSpinner();
    return zip(dayMonthShortForm, weekDaysShortForm,orderingContentStrings, statesStrings, favouriteMerchant).pipe(
      finalize(() => this.loadingService.closeSpinner()),
    );
  }

  private updateOrderValidationErrorObject(): Observable<ContentStringInfo[]> {
    const updatingConfigs = [
      { key: 9017, value: ORDERING_CONTENT_STRINGS.errorMessageTimeSlotCapacityReached },
      { key: 6112, value: ORDERING_CONTENT_STRINGS.errorMessageInsufficientFunds },
    ];
    return this.contentStringsFacadeService.fetchContentStrings$(
      CONTENT_STINGS_DOMAINS.patronUi,
      CONTENT_STINGS_CATEGORIES.ordering,
    ).pipe(
      tap(strings =>
        strings && this.updateOrderValidationErrors(updatingConfigs, strings, ORDER_VALIDATION_ERRORS),
      ));
  }

  private updateOrderValidationErrors(
    instructions: UpdateConfig[],
    configs: ContentStringInfo[],
    sourceObject: typeof ORDER_VALIDATION_ERRORS) {
    for (let i = 0; i < instructions.length; i++) {
      const config = configs.find(({ name }) => name === instructions[i].value);
      config && config.value && (sourceObject[instructions[i].key] = config.value);
    }
  }
}

interface UpdateConfig {
  key: keyof typeof ORDER_VALIDATION_ERRORS;
  value: ORDERING_CONTENT_STRINGS;
}
