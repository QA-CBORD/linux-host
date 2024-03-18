import { Injectable } from '@angular/core';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { ORDERING_CONTENT_STRINGS } from '@sections/ordering/ordering.config';
import { Observable, lastValueFrom } from 'rxjs';
import { CONTENT_STRINGS_CATEGORIES, CONTENT_STRINGS_DOMAINS } from '../../../content-strings';
import { map, take } from 'rxjs/operators';
import { ContentStringInfo } from '@core/model/content/content-string-info.model';

@Injectable({
  providedIn: 'root',
})
export class OrderingService {
  constructor(private readonly contentStringsFacadeService: ContentStringsFacadeService) { }

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

  async getContentErrorStringByException(err: string | [string, string], defaultMessage: string): Promise<string> {

    const errorMessage = Array.isArray(err) ? err[0] : err;

    if (err && err.includes('CONTENT_STRING')) {
      const contentStringKey: ORDERING_CONTENT_STRINGS = errorMessage.split('CONTENT_STRING:')[1] as ORDERING_CONTENT_STRINGS;
      const message = await lastValueFrom(this.getContentErrorStringByName(contentStringKey).pipe(take(1)));
      return message;
    }

    return  errorMessage || defaultMessage;
  }
}

export type OrderingComponentContentStrings = { -readonly [key in keyof typeof ORDERING_CONTENT_STRINGS]: Observable<string> };
