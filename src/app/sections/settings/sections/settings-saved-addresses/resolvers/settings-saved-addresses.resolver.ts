import { Injectable } from '@angular/core';

import { Resolve } from '@angular/router';

import { Observable, forkJoin } from 'rxjs';

import { ContentStringInfo } from '@core/model/content/content-string-info.model';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { CONTENT_STRINGS_DOMAINS, CONTENT_STRINGS_CATEGORIES } from 'src/app/content-strings';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '@core/service/loading/loading.service';

@Injectable()
export class SettingsSavedAddressesResolver implements Resolve<Observable<[ContentStringInfo[], ContentStringInfo[]]>> {
  constructor(
    private readonly loadingService: LoadingService,
    private readonly contentStringsFacadeService: ContentStringsFacadeService
  ) {}

  resolve(): Observable<[ContentStringInfo[], ContentStringInfo[]]> {
    const orderingContentStrings = this.contentStringsFacadeService.fetchContentStrings$(
      CONTENT_STRINGS_DOMAINS.patronUi,
      CONTENT_STRINGS_CATEGORIES.ordering
    );

    const statesStrings = this.contentStringsFacadeService.fetchContentStrings$(
      CONTENT_STRINGS_DOMAINS.patronUi,
      CONTENT_STRINGS_CATEGORIES.usStates
    );

    this.loadingService.showSpinner();
    return forkJoin([orderingContentStrings, statesStrings]).pipe(finalize(() => this.loadingService.closeSpinner()));
  }
}
