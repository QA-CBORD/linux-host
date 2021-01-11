import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { APIService, HttpResponseType, RestCallType } from '@core/service/api-service/api.service';
import { StorageStateService } from '@core/states/storage/storage-state.service';
import { forkJoin, from, Observable, of } from 'rxjs';
import { catchError, first, map, switchMap, take } from 'rxjs/operators';
import { CONTENT_STRINGS_CATEGORIES, CONTENT_STRINGS_DOMAINS } from 'src/app/content-strings';
import { AndroidCredential, Persistable } from '../android/android-credential.model';
import { MobileCredentialDataService } from './mobile-credential-data.service';

const api_version = 'v1';
const resourceUrls = {
  activePasses: `/android/${api_version}/activePasses`,
  activePassesDebug: '../../../../../assets/mock/activepasses.json',
  credentialsDebug: '../../../../../assets/mock/android_credentials.json',
};

export class AndroidCredentialDataService extends MobileCredentialDataService {
  constructor(
    private resources: { credentialUrl: string },
    protected storageStateService: StorageStateService,
    protected authFacadeService: AuthFacadeService,
    protected contentStringFacade: ContentStringsFacadeService,
    protected institutionFacadeService: InstitutionFacadeService,
    protected apiService: APIService,
    protected http: HttpClient,
    protected userFacade: UserFacadeService
  ) {
    super(
      storageStateService,
      authFacadeService,
      institutionFacadeService,
      apiService,
      userFacade,
      contentStringFacade
    );
  }

  activePasses$(): Observable<AndroidCredential<any>> {
    return super.activePasses$().pipe(
      switchMap(mobileCredential => {
        const androidCredentials = mobileCredential as AndroidCredential<any>;
        return this.getLocalStoredUserData<Persistable>(this.credential_key).pipe(
          map(data => {
            androidCredentials.setCredentialBundle(data);
            return androidCredentials;
          })
        );
      })
    );
  }

  protected getUserId(): Observable<string> {
    return this.userFacade.getUserData$().pipe(
      first(),
      map(({ id }) => id)
    );
  }

  getLocalStoredUserData<T>(dataKey: string, forAnyUser: boolean = false): Observable<T> {
    return this.storageStateService.getStateEntityByKey$<T>(dataKey).pipe(
      switchMap(data => {
        if (data && data.value) {
          return this.getUserId().pipe(map(id => (forAnyUser || (<any>data.value).userId === id ? data.value : null)));
        } else {
          return of(null);
        }
      })
    );
  }

  protected androidCredential$(requestBody: any, extraHeaders?: object): Observable<any> {
    return this.getCredentialFor(requestBody, extraHeaders).pipe(
      take(1),
      map((credentialData: any[]) => {
        let [credentialBundle] = credentialData;
        return credentialBundle;
      })
    );
  }

  termsContentString$(termsContentString?: {
    domain: CONTENT_STRINGS_DOMAINS;
    category: CONTENT_STRINGS_CATEGORIES;
    name: string;
  }): Promise<string> {
    const contentStringSetting = termsContentString || {
      domain: CONTENT_STRINGS_DOMAINS.patronUi,
      category: CONTENT_STRINGS_CATEGORIES.mobileCredential,
      name: 'terms',
    };

    return super
      .contentString$(contentStringSetting)
      .pipe(catchError(() => 'No content'))
      .toPromise();
  }

  credentialUsageContentString$(usagecontentStringConfig?: {
    domain: CONTENT_STRINGS_DOMAINS;
    category: CONTENT_STRINGS_CATEGORIES;
    name: string;
  }): Promise<string> {
    const contentStringSettings = usagecontentStringConfig || {
      domain: CONTENT_STRINGS_DOMAINS.patronUi,
      category: CONTENT_STRINGS_CATEGORIES.mobileCredential,
      name: 'usage-instructions',
    };
    return super
      .contentString$(contentStringSettings)
      .pipe(
        switchMap(contentString => {
          if (contentString) {
            return of(contentString);
          }
          return from('No content');
        }),
        catchError(() => 'No content')
      )
      .toPromise();
  }

  protected getDefaultHeaders(): Observable<HttpHeaders> {
    return this.omniIDJwtToken$().pipe(
      map(omniIDJwtToken => {
        return new HttpHeaders({
          Authorization: `Bearer ${omniIDJwtToken}`,
        });
      })
    );
  }

  private getCredentialFor(body: object, extraHeaders?: object): Observable<any> {
    /**
     * makes call to partner payments api, resource: android/version/credential.
     *
     * @params referenceIdentifier: body required to call android credentials
     *
     * returns credentials for android user.
     */
    const institutionInfo$ = this.institutionFacadeService.cachedInstitutionInfo$.pipe(take(1));
    const deviceInfo$ = this.deviceInfo$.pipe(take(1));
    const requestHeader$ = this.getDefaultHeaders().pipe(take(1));

    return forkJoin(requestHeader$, deviceInfo$, institutionInfo$).pipe(
      switchMap(([requestHeader, deviceInfo, { id }]) => {
        const params = new HttpParams().set('institutionId', id);
        const requestBody = {
          ...body,
          device: {
            manufacturer: deviceInfo.manufacturer,
            model: deviceInfo.model,
            osVersion: deviceInfo.osVersion,
          },
        };
        return this.apiService.partnerHTTPCall(
          RestCallType.post,
          this.resources.credentialUrl,
          HttpResponseType.json,
          requestBody,
          params,
          requestHeader
        );
      })
    );
  }

  protected updateCredential$(reqBody: any): Observable<any> {
    const institutionInfo$ = this.institutionFacadeService.cachedInstitutionInfo$.pipe(take(1));
    const deviceInfo$ = this.deviceInfo$.pipe(take(1));
    const defaultHeader$ = this.getDefaultHeaders().pipe(take(1));
    return forkJoin(defaultHeader$, institutionInfo$, deviceInfo$).pipe(
      switchMap(([requestHeaders, { id }, { manufacturer, model, osVersion }]) => {
        const params = new HttpParams().set('institutionId', id);
        const body = {
          ...reqBody,
          device: {
            manufacturer,
            model,
            osVersion,
          },
        };
        return this.apiService.partnerHTTPCall(
          RestCallType.put,
          `${this.resources.credentialUrl}/${body.credentialID}`,
          HttpResponseType.json,
          body,
          params,
          requestHeaders
        );
      })
    );
  }

  protected deleteCredential$(credentialId: string | any): Observable<any> {
    // get the mobile credential id that we want to delete.
    const institutionInfo$ = this.institutionFacadeService.cachedInstitutionInfo$.pipe(take(1));
    const defaultHeader$ = this.getDefaultHeaders().pipe(take(1));
    return forkJoin(institutionInfo$, defaultHeader$).pipe(
      switchMap(([{ id }, requestHeaders]) => {
        const params = new HttpParams().set('institutionId', id);
        return this.apiService
          .partnerHTTPCall(
            RestCallType.delete,
            `${this.resources.credentialUrl}/${credentialId}`,
            HttpResponseType.json,
            null,
            params,
            requestHeaders
          )
          .pipe(
            map(() => {
              of(true);
            })
          );
      })
    );
  }

  mockAndroidCredentials(): Observable<any> {
    return this.http.get<any>(resourceUrls.credentialsDebug);
  }

  mockActivePasses(): Observable<any> {
    return this.http.get<any>(resourceUrls.activePassesDebug).pipe(
      map(({ credStatus, passes, referenceIdentifier }) => {
        return { credStatus, passes, referenceIdentifier };
      })
    );
  }
}
