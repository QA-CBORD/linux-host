import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { APIService, HttpResponseType, RestCallType } from '@core/service/api-service/api.service';
import { StorageStateService } from '@core/states/storage/storage-state.service';
import { forkJoin, Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { CONTENT_STRINGS_CATEGORIES, CONTENT_STRINGS_DOMAINS } from 'src/app/content-strings';
import { AndroidCredential, Persistable } from '../android/android-credential.model';
import { MobileCredentialDataService } from './mobile-credential-data.service';

const api_version = 'v1';
const resourceUrls = {
  activePasses: `/android/${api_version}/activePasses`,
  activePassesDebug: '../../../../../assets/mock/activepasses.json',
  credentialsDebug: '../../../../../assets/mock/android_credentials.json'
};

export class AndroidCredentialDataService extends MobileCredentialDataService {
  constructor(
    private resources: { credentialUrl: string },
    protected storageStateService: StorageStateService,
    protected authFacadeService: AuthFacadeService,
    protected contentStringFacade: ContentStringsFacadeService,
    protected institutionFacadeService: InstitutionFacadeService,
    protected apiService: APIService,
    protected http: HttpClient
  ) {
    super(storageStateService, authFacadeService, institutionFacadeService, apiService);
  }

  activePasses$(): Observable<AndroidCredential<any>> {
    return super.activePasses$().pipe(
      switchMap(mobileCredential => {
        const androidCredentials = mobileCredential as AndroidCredential<any>;
        return this.storageStateService.getStateEntityByKey$<Persistable>(this.credential_key).pipe(
          map(data => {
            if (data) {
              androidCredentials.setCredentialData(data.value);
            }
            return androidCredentials;
          })
        );
      })
    );
  }

  protected androidCredential$(requestBody: any): Observable<any> {
    return this.getCredentialFor(requestBody).pipe(
      take(1),
      map((credentialData: any[]) => {
        return credentialData[0];
      })
    );
  }

  contentString$(contentStringSettings: {
    domain: CONTENT_STRINGS_DOMAINS;
    category: CONTENT_STRINGS_CATEGORIES;
    name: string;
  }): Observable<string> {
    let { domain, category, name } = contentStringSettings;
    return this.contentStringFacade.fetchContentString$(domain, category, name).pipe(
      map(data => {
        return data.value;
      }),
      take(1)
    );
  }

  private getCredentialFor(body: object): Observable<any> {
    /**
     * makes call to partner payments api, resource: android/version/credential.
     *
     * @params referenceIdentifier: body required to call android credentials
     *
     * returns credentials for android user.
     */
    const institutionInfo$ = this.institutionFacadeService.cachedInstitutionInfo$.pipe(take(1));
    const deviceInfo$ = this.deviceInfo$.pipe(take(1));
    const omniIDJwtToken$ = this.omniIDJwtToken$().pipe(take(1));

    return forkJoin(omniIDJwtToken$, deviceInfo$, institutionInfo$).pipe(
      switchMap(([jwtOmniIDToken, deviceInfo, { id }]) => {
        const headers = new HttpHeaders({ Authorization: `Bearer ${jwtOmniIDToken}` });
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
          headers
        );
      })
    );
  }

  protected updateCredential$(reqBody: any): Observable<any> {
    const institutionInfo$ = this.institutionFacadeService.cachedInstitutionInfo$.pipe(take(1));
    const deviceInfo$ = this.deviceInfo$.pipe(take(1));
    const omniIDJwtToken$ = this.omniIDJwtToken$().pipe(take(1));
    return forkJoin(omniIDJwtToken$, institutionInfo$, deviceInfo$).pipe(
      switchMap(([jwtOmniIDToken, { id }, { manufacturer, model, osVersion }]) => {
        const headers = new HttpHeaders({ Authorization: `Bearer ${jwtOmniIDToken}` });
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
          headers
        );
      })
    );
  }

  protected deleteCredential$(credentialId: string): Observable<any> {
    // get the mobile credential id that we want to delete.
    const institutionInfo$ = this.institutionFacadeService.cachedInstitutionInfo$;
    const omniIDJwtToken$ = this.omniIDJwtToken$().pipe(take(1));
    return forkJoin(institutionInfo$, omniIDJwtToken$).pipe(
      switchMap(([{ id }, jwtOmniIDToken]) => {
        const headers = new HttpHeaders({ Authorization: `Bearer ${jwtOmniIDToken}` });
        const params = new HttpParams().set('institutionId', id);
        return this.apiService
          .partnerHTTPCall(
            RestCallType.delete,
            `${this.resources.credentialUrl}/${credentialId}`,
            HttpResponseType.json,
            null,
            params,
            headers
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
    return this.http
      .get<any>(resourceUrls.credentialsDebug)
  }
  
  mockActivePasses(): Observable<any> {
    return this.http.get<any>(resourceUrls.activePassesDebug).pipe(
      map(({ credStatus, passes, referenceIdentifier }) => {
        return { credStatus, passes, referenceIdentifier };
      })
    );
  }
}
