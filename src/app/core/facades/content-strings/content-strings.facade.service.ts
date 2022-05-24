import { Injectable } from '@angular/core';
import { ServiceStateFacade } from '@core/classes/service-state-facade';
import { ContentStringsStateService } from '@core/states/content-strings/content-strings-state.service';
import { ContentStringsApiService } from '@core/service/content-service/content-strings-api.service';
import { combineLatest, iif, Observable, of, zip } from 'rxjs';
import { ContentStringInfo } from '@core/model/content/content-string-info.model';
import { catchError, map, skipWhile, switchMap, take, tap } from 'rxjs/operators';
import { CONTENT_STRINGS_CATEGORIES, CONTENT_STRINGS_DOMAINS, CONTENT_STRINGS_LOCALES } from '../../../content-strings';
import {
  ContentStringApi,
  ContentStringCategory,
} from '@shared/model/content-strings/content-strings-api';
import { ContentStringModel } from '@shared/model/content-strings/content-string-models';
import { ContentStringRequest } from '@core/model/content/content-string-request.model';

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

  retrieveContentStringByConfig(config, sessionId?: string, useSessionId?: boolean): Observable<ContentStringInfo> {
    return this.apiService.retrieveContentStringByConfig(config, sessionId, useSessionId);
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

  fetchContentStringModel<T extends ContentStringModel>(
    category: ContentStringCategory,
    args: { data?: any; requests?: ContentStringRequest[], save?:boolean } = {}
  ): Observable<T> {
    const params = args.data;
    const ContentStringBuilder = ContentStringApi[category];
    const extraRequests = args.requests || [];
    const requestList = extraRequests.map(req => this.retrieveContentStringByConfig({ ...req }).pipe(take(1)));
    
    let contentsByCategory$:Observable<ContentStringInfo[]>;
    if (args.save) {
      contentsByCategory$ = this.resolveContentStrings$(
        CONTENT_STRINGS_DOMAINS.patronUi,
        ContentStringBuilder.category
      );
    } else {
      contentsByCategory$ = this.fetchContentStringAfresh(
        CONTENT_STRINGS_DOMAINS.patronUi,
        ContentStringBuilder.category
      );
    }

    const loadMultiple = requestList.length > 0;

    const combined = zip(contentsByCategory$, combineLatest(requestList)).pipe(
      map(([primary, secondary]) => {
        const contentString = <T>ContentStringBuilder.build({
          primary,
          secondary,
          params,
        });
        return contentString;
      }),
      catchError(() => of(<T>ContentStringBuilder.build({ params })))
    );

    const single = contentsByCategory$.pipe(
      map(primary => <T>ContentStringBuilder.build({ primary, params })),
      catchError(() => of(<T>ContentStringBuilder.build({ params })))
    );

    return iif(() => loadMultiple, combined, single);
  }

  fetchContentStringAfresh(
    domain: CONTENT_STRINGS_DOMAINS,
    category: CONTENT_STRINGS_CATEGORIES,
    locale: CONTENT_STRINGS_LOCALES | null = null
  ): Observable<ContentStringInfo[]> {
    const call = this.apiService.retrieveContentStringListByRequest({ domain, category, locale });
    return this.makeRequestWithUpdatingStateHandler<ContentStringInfo[]>(call, this.stateService).pipe(take(1));
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
  resolveContentStringValue$(
    domain: CONTENT_STRINGS_DOMAINS,
    category: CONTENT_STRINGS_CATEGORIES,
    name: string
  ): Observable<string> {
    return this.resolveContentString$(domain, category, name).pipe(
      skipWhile(value => !value),
      map(({ value }) => value)
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
