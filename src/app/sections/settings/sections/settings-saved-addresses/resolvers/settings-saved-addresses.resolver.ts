import { Injectable } from '@angular/core';

import { Resolve } from '@angular/router';

import { Observable } from 'rxjs';

import { ContentStringInfo } from '@core/model/content/content-string-info.model';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { CONTENT_STRINGS_DOMAINS, CONTENT_STRINGS_CATEGORIES } from 'src/app/content-strings';
import { concat, first } from 'rxjs/operators';

@Injectable()
export class SettingsSavedAddressesResolver implements Resolve<Observable<ContentStringInfo[]>> {
  constructor(private readonly contentStringsFacadeService: ContentStringsFacadeService) {}

  resolve(): Observable<ContentStringInfo[]> {
    const orderingContentStrings = this.contentStringsFacadeService.fetchContentStrings$(
      CONTENT_STRINGS_DOMAINS.patronUi,
      CONTENT_STRINGS_CATEGORIES.ordering
    );

    return orderingContentStrings.pipe(first());
  }
}
