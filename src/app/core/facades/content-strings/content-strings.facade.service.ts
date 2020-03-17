import { Injectable } from '@angular/core';
import { ServiceStateFacade } from '@core/classes/service-state-facade';
import { ContentStringsStateService } from '@core/states/content-strings/content-strings-state.service';
import { ContentStringsApiService } from '@core/service/content-service/content-strings-api.service';
import { Observable } from 'rxjs';
import { ContentStringInfo } from '@core/model/content/content-string-info.model';
import { map, skipWhile, tap } from 'rxjs/operators';
import { CONTENT_STINGS_CATEGORIES, CONTENT_STINGS_DOMAINS, CONTENT_STINGS_LOCALES } from '../../../content-strings';

@Injectable({
  providedIn: 'root',
})
export class ContentStringsFacadeService extends ServiceStateFacade {

  constructor(private readonly stateService: ContentStringsStateService,
              private readonly apiService: ContentStringsApiService) {
    super();
  }

  get contentStrings$(): Observable<ContentStringInfo[]> {
    return this.stateService.state$;
  }

  get isStateUpdating$(): Observable<boolean> {
    return this.stateService.isUpdating$;
  }

  getContentString$(domain: CONTENT_STINGS_DOMAINS,
                    category: CONTENT_STINGS_CATEGORIES,
                    name: string): Observable<ContentStringInfo> {
    return this.stateService.getContentString$(domain, category, name);
  }

  getContentStrings$(domain: CONTENT_STINGS_DOMAINS,
                     category: CONTENT_STINGS_CATEGORIES): Observable<ContentStringInfo[]> {
    return this.stateService.getContentStrings$(domain, category);
  }

  getContentStringValue$(domain: CONTENT_STINGS_DOMAINS,
                         category: CONTENT_STINGS_CATEGORIES,
                         name: string): Observable<string> {
    return this.getContentString$(domain, category, name).pipe(
      skipWhile(value => !value),
      map(({value}) => value)
    );
  }

  fetchContentStrings$(domain: CONTENT_STINGS_DOMAINS,
                       category: CONTENT_STINGS_CATEGORIES,
                       locale: CONTENT_STINGS_LOCALES | null = null): Observable<ContentStringInfo[]> {
    const call = this.apiService.retrieveContentStringListByRequest({ domain, category, locale });

    return this.makeRequestWithUpdatingStateHandler<ContentStringInfo[]>(call, this.stateService).pipe(
        tap((data: ContentStringInfo[]) => this.addContentStringsToState(data)),
    );
  }

  fetchContentString$(domain: CONTENT_STINGS_DOMAINS,
                      category: CONTENT_STINGS_CATEGORIES,
                      name: string,
                      locale: CONTENT_STINGS_LOCALES | null = null): Observable<ContentStringInfo> {
    const call = this.apiService.retrieveContentStringByConfig({ domain, category, name, locale });

    return this.makeRequestWithUpdatingStateHandler<ContentStringInfo>(call, this.stateService).pipe(
        tap((data: ContentStringInfo) => this.addContentStringsToState(data)),
    );
  }

  addContentStringsToState(contentStrings: ContentStringInfo | ContentStringInfo[]) {
    this.stateService.updateState(contentStrings);
  }

  removeSetting(domain: CONTENT_STINGS_DOMAINS,
                category: CONTENT_STINGS_CATEGORIES,
                name: string) {
    this.stateService.removeContentString(domain, category, name);
  }
}
