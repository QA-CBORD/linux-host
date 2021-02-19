import { Injectable } from '@angular/core';
import { ServiceStateFacade } from '@core/classes/service-state-facade';
import { ContentStringsStateService } from '@core/states/content-strings/content-strings-state.service';
import { ContentStringsApiService } from '@core/service/content-service/content-strings-api.service';
import { Observable, of } from 'rxjs';
import { ContentStringInfo } from '@core/model/content/content-string-info.model';
import { map, skipWhile, switchMap, tap } from 'rxjs/operators';
import { CONTENT_STRINGS_CATEGORIES, CONTENT_STRINGS_DOMAINS, CONTENT_STRINGS_LOCALES } from '../../../content-strings';

@Injectable({
  providedIn: 'root',
})
export class ContentStringsFacadeService extends ServiceStateFacade {
  constructor(
    private readonly stateService: ContentStringsStateService,
    private readonly apiService: ContentStringsApiService
  ) {
    super();
  }

  get contentStrings$(): Observable<ContentStringInfo[]> {
    return this.stateService.state$;
  }

  get isStateUpdating$(): Observable<boolean> {
    return this.stateService.isUpdating$;
  }

  getContentString$(
    domain: CONTENT_STRINGS_DOMAINS,
    category: CONTENT_STRINGS_CATEGORIES,
    name: string
  ): Observable<ContentStringInfo | null> {
    return this.stateService.getContentString$(domain, category, name);
  }

  getContentStrings$(
    domain: CONTENT_STRINGS_DOMAINS,
    category: CONTENT_STRINGS_CATEGORIES
  ): Observable<ContentStringInfo[]> {
    return this.stateService.getContentStrings$(domain, category);
  }

  getContentStringValue$(
    domain: CONTENT_STRINGS_DOMAINS,
    category: CONTENT_STRINGS_CATEGORIES,
    name: string
  ): Observable<string> {
    return this.getContentString$(domain, category, name).pipe(
      skipWhile(value => !value),
      map(({ value }) => value)
    );
  }

  fetchContentStrings$(
    domain: CONTENT_STRINGS_DOMAINS,
    category: CONTENT_STRINGS_CATEGORIES,
    locale: CONTENT_STRINGS_LOCALES | null = null
  ): Observable<ContentStringInfo[]> {
    const call = this.apiService.retrieveContentStringListByRequest({ domain, category, locale });

    return this.makeRequestWithUpdatingStateHandler<ContentStringInfo[]>(call, this.stateService).pipe(
      tap((data: ContentStringInfo[]) => this.addContentStringsToState(data))
    );
  }

  clearState(): void {
    this.stateService.clearState();
  }

  fetchContentString$(
    domain: CONTENT_STRINGS_DOMAINS,
    category: CONTENT_STRINGS_CATEGORIES,
    name: string,
    locale: CONTENT_STRINGS_LOCALES | null = null,
    sessionId?: string,
    useSessionId?: boolean
  ): Observable<ContentStringInfo> {
    const call = this.apiService.retrieveContentStringByConfig(
      { domain, category, name, locale },
      sessionId,
      useSessionId
    );

    return this.makeRequestWithUpdatingStateHandler<ContentStringInfo>(call, this.stateService).pipe(
      tap((data: ContentStringInfo) => this.addContentStringsToState(data))
    );
  }

  ContentStringByInstitution$(
    domain: CONTENT_STRINGS_DOMAINS,
    category: CONTENT_STRINGS_CATEGORIES,
    name: string,
    institutionId: string
  ): Observable<ContentStringInfo> {
    return this.apiService.ContentStringByInstitution$({ domain, category, name }, institutionId);
  }

  resolveContentString$(
    domain: CONTENT_STRINGS_DOMAINS,
    category: CONTENT_STRINGS_CATEGORIES,
    name: string,
    sessionId?: string,
    useSessionId?: boolean
  ): Observable<ContentStringInfo> {
    return this.getContentString$(domain, category, name).pipe(
      switchMap(setting =>
        setting !== null ? of(setting) : this.fetchContentString$(domain, category, name, null, sessionId, useSessionId)
      )
    );
  }

  resolveContentStrings$(
    domain: CONTENT_STRINGS_DOMAINS,
    category: CONTENT_STRINGS_CATEGORIES
  ): Observable<ContentStringInfo[]> {
    return this.getContentStrings$(domain, category).pipe(
      switchMap(settings =>
        settings !== null && settings.length ? of(settings) : this.fetchContentStrings$(domain, category)
      )
    );
  }

  addContentStringsToState(contentStrings: ContentStringInfo | ContentStringInfo[]) {
    this.stateService.updateState(contentStrings);
  }

  removeContentString(domain: CONTENT_STRINGS_DOMAINS, category: CONTENT_STRINGS_CATEGORIES, name: string) {
    this.stateService.removeContentString(domain, category, name);
  }
}
