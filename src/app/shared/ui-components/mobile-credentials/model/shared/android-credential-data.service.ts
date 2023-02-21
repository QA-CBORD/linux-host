/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { APIService, HttpResponseType, RestCallType } from '@core/service/api-service/api.service';
import { StorageStateService } from '@core/states/storage/storage-state.service';
import { forkJoin, Observable, of } from 'rxjs';
import { first, map, switchMap, take, tap } from 'rxjs/operators';
import { AndroidCredential, CredentialBundle, Persistable } from '../android/android-credential.model';
import { MobileCredentialDataService } from './mobile-credential-data.service';
import { AndroidCredentialCsModel } from '../android/android-credential-content-strings.model';
import { ContentStringCategory } from '@shared/model/content-strings/content-strings-api';
import { Platform } from '@ionic/angular';

const api_version = 'v1';
const resourceUrls = {
  activePasses: `/android/${api_version}/activePasses`,
  activePassesDebug: '../../../../../assets/mock/activepasses.json',
  credentialsDebug: '../../../../../assets/mock/android_credentials.json',
};

export class AndroidCredentialDataService extends MobileCredentialDataService {
  private contentStrings: AndroidCredentialCsModel;

  constructor(
    private resources: { credentialUrl: string },
    protected storageStateService: StorageStateService,
    protected authFacadeService: AuthFacadeService,
    protected contentStringFacade: ContentStringsFacadeService,
    protected institutionFacadeService: InstitutionFacadeService,
    protected apiService: APIService,
    protected http: HttpClient,
    protected userFacade: UserFacadeService,
    protected platform: Platform
  ) {
    super(
      storageStateService,
      authFacadeService,
      institutionFacadeService,
      apiService,
      userFacade,
      contentStringFacade,
      platform
    );
  }

  activePasses$(): Observable<AndroidCredential<any>> {
    return super.activePasses$().pipe(
      switchMap(mobileCredential => {
        const androidCredentials = mobileCredential as AndroidCredential<any>;
        return this.getLocalStoredUserData<Persistable>(this.credential_key).pipe(
          map(credentialBundle => {
            androidCredentials.setCredentialBundle(credentialBundle);
            return androidCredentials;
          })
        );
      })
    );
  }

  getUserCredentials(): Observable<AndroidCredential<any>> {
    return super.activePasses$().pipe(map(data => data as AndroidCredential<any>));
  }

  protected getUserId(): Observable<string> {
    return this.userFacade.getUserData$().pipe(
      first(),
      map(({ id }) => id)
    );
  }

  getLocalStoredUserData<T>(dataKey: string, forAnyUser = false): Observable<T> {
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

  // eslint-disable-next-line @typescript-eslint/ban-types
  protected androidCredentialBundle$(requestBody: any, extraHeaders?: object): Observable<CredentialBundle> {
    return this.getCredentialFor(requestBody, extraHeaders).pipe(
      take(1),
      map((credentialData: any[]) => {
        const [credentialBundle] = credentialData;
        return credentialBundle;
      })
    );
  }

  private async retrieveAllContentStrings(): Promise<AndroidCredentialCsModel> {
    return await this.contentStringFacade
      .fetchContentStringModel<AndroidCredentialCsModel>(ContentStringCategory.mobileCredential)
      .pipe(
        tap(data => (this.contentStrings = data))
      )
      .toPromise();
  }

  async getContents(): Promise<AndroidCredentialCsModel> {
    return (
      (this.contentStrings && of(this.contentStrings).toPromise()) ||
      this.retrieveAllContentStrings()
    );
  }

  async unloadContentStrings(): Promise<void>{
    this.contentStrings = null;
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

  // eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-unused-vars
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
