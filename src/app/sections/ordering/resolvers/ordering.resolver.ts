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
export class OrderingResolver implements Resolve<Observable<[ContentStringInfo[], MerchantInfo[]]>> {

  constructor(private readonly merchantService: MerchantService,
    private readonly loadingService: LoadingService,
    private readonly contentStringsFacadeService: ContentStringsFacadeService) {
  }

  resolve(): Observable<[ContentStringInfo[], MerchantInfo[]]> {
    const contentStringsCall = this.updateOrderValidationErrorObject();
    const favouriteMerchant = this.merchantService.getMerchantsWithFavoriteInfo();

    this.loadingService.showSpinner();
    return zip(contentStringsCall, favouriteMerchant).pipe(
      finalize(() => this.loadingService.closeSpinner()),
    );
  }

  updateOrderValidationErrorObject(): Observable<ContentStringInfo[]> {
    return this.contentStringsFacadeService.fetchContentStrings$(
      CONTENT_STINGS_DOMAINS.patronUi,
      CONTENT_STINGS_CATEGORIES.ordering,
    ).pipe(
      tap(strings => {
        if (!strings.length) return;
        const { value } =
          strings.find(({ name }) => name === ORDERING_CONTENT_STRINGS.errorMessageTimeSlotCapacityReached);
        ORDER_VALIDATION_ERRORS['9017'] = value;
      })
    );
  }
}
