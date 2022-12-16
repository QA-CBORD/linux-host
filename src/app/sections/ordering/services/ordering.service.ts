import { Injectable } from '@angular/core';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { ORDERING_CONTENT_STRINGS } from '@sections/ordering/ordering.config';
import { Observable } from 'rxjs';
import { CONTENT_STRINGS_CATEGORIES, CONTENT_STRINGS_DOMAINS } from '../../../content-strings';
import { map } from 'rxjs/operators';
import { ContentStringInfo } from '@core/model/content/content-string-info.model';

@Injectable()
export class OrderingService {
  constructor(private readonly contentStringsFacadeService: ContentStringsFacadeService) {}

  getContentStringByName(name: ORDERING_CONTENT_STRINGS): Observable<string> {
    return this.contentStringsFacadeService
      .getContentString$(CONTENT_STRINGS_DOMAINS.patronUi, CONTENT_STRINGS_CATEGORIES.ordering, name)
      .pipe(map((string: ContentStringInfo) => (string ? string.value : '')));
  }

  getContentErrorStringByName(name: ORDERING_CONTENT_STRINGS): Observable<string> {
    return this.contentStringsFacadeService
      .resolveContentString$(CONTENT_STRINGS_DOMAINS.get_common, CONTENT_STRINGS_CATEGORIES.error, name)
      .pipe(map((string: ContentStringInfo) => (string ? string.value : '')));
  }
}

export type OrderingComponentContentStrings = { -readonly [key in keyof typeof ORDERING_CONTENT_STRINGS]: Observable<string> };
