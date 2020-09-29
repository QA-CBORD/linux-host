import { Injectable } from '@angular/core';
import { forkJoin, from, Observable, of } from 'rxjs';
import { take, switchMap, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { RestCallType, HttpResponseType, APIService } from '@core/service/api-service/api.service';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { StorageStateService } from '@core/states/storage/storage-state.service';
import { Device } from '@capacitor/core';

const api_version = 'v1';

const paymentApiResources = {
  activePasses: `/android/${api_version}/activePasses`,
  credentials: `/android/${api_version}/credential`,
  activePassesDebug: '../../../../../assets/mock/activepasses.json',
  credentialsDebug: '../../../../../assets/mock/android_credentials.json',
};

@Injectable({
  providedIn: 'root',
})
export class PartnerPaymentApiService {
  private ttl: number = 600000; // 10min
  private jwtToken_key: string = 'jwt_token';
  private authBlob_key: string = 'auth_blob';
  private active_passes_key: string = 'active_pass';
  private android_cred_key: string = 'android_cred';

  constructor(
    private readonly institutionFacadeService: InstitutionFacadeService,
    private readonly apiService: APIService,
    private readonly storageStateService: StorageStateService,
    private readonly authFacadeService: AuthFacadeService,
    private http: HttpClient
  ) {}

  omniIDJwtToken$(): Observable<string> {
    return this.storageStateService.getStateEntityByKey$<string>(this.jwtToken_key).pipe(
      switchMap(data => {
        if (data != null && data.lastModified + data.timeToLive >= Date.now()) return of(data.value);
        console.log('inside omniIDJwtToken');
        return this.retrieveOmniIDJwtToken$();
      })
    );
  }

  retrieveOmniIDJwtToken$(): Observable<string> {
    return this.authFacadeService
      .getExternalAuthenticationToken$('OmniID')
      .pipe(tap(data => this.storageStateService.updateStateEntity(this.jwtToken_key, data, { ttl: this.ttl })));
  }

  authorizationBlob$(): Observable<string> {
    return this.storageStateService.getStateEntityByKey$<string>(this.authBlob_key).pipe(
      switchMap(data => {
        if (data != null && data.lastModified + data.timeToLive >= Date.now()) return of(data.value);
        console.log('inside authorizationBlob');
        return from(Device.getInfo()).pipe(
          switchMap(({ model, osVersion }) => {
            return this.retrieveAuthorizationBlob$(model, osVersion);
          })
        );
      })
    );
  }

  retrieveAuthorizationBlob$(deviceModel: string, osVersion: string): Observable<string> {
    return this.authFacadeService.retrieveAuthorizationBlob(deviceModel, osVersion).pipe(
      map(({ response }) => response),
      tap(response => this.storageStateService.updateStateEntity(this.authBlob_key, response, { ttl: this.ttl }))
    );
  }

  androidActivePasses(): Observable<any> {
    /**
     * @params omniIDToken -> jwt token needed to authenticate with partner payments api on aws.
     * @params authBlob  -> authorization blob that contains ..... ???
     * calls api gw android/version/actipasses to obtain activaPasses info for current patron/user.
     * this data is then used to get a credential for the patron/user.
     */
    // we need to send the institution id to activaPasses resource.

    return this.storageStateService.getStateEntityByKey$<any>(this.active_passes_key).pipe(
      switchMap(data => {
        if (data != null && data.lastModified + data.timeToLive >= Date.now()) {
          return of(data.value);
        }
        const institutionInfo$ = this.institutionFacadeService.cachedInstitutionInfo$.pipe(take(1));
        // doing a forkJoin to ensure all requests actually complete, if one of these fails, the others are useless, just return error
        let omniIDJwtToken$ = this.omniIDJwtToken$().pipe(take(1));
        let authorizationBlob$ = this.authorizationBlob$().pipe(take(1));
        return forkJoin(institutionInfo$, omniIDJwtToken$, authorizationBlob$).pipe(
          switchMap(([institution, omniIdJwt, authBlob]) => {
            const headers = new HttpHeaders({ Authorization: `Bearer ${omniIdJwt}` });
            // the institution id is required for this request.
            const params = new HttpParams().set('institutionId', institution.id);
            // authBlob needs to be sent in request body.
            const requestBody = { authorizationBlob: authBlob };
            return this.apiService
              .partnerHTTPCall(
                RestCallType.post,
                paymentApiResources.activePasses,
                HttpResponseType.json,
                requestBody,
                params,
                headers
              )
              .pipe(
                map(({ credStatus, passes, referenceIdentifier }) => {
                  return { credStatus, passes, referenceIdentifier };
                }),
                tap(response =>
                  this.storageStateService.updateStateEntity(this.active_passes_key, response, { ttl: this.ttl })
                )
              );
          })
        );
      })
    );
  }

  mockActivePasses(): Observable<any> {
    return this.http.get<any>(paymentApiResources.activePassesDebug).pipe(
      map(({ credStatus, passes, referenceIdentifier }) => {
        return { credStatus, passes, referenceIdentifier };
      }),
      tap(response => this.storageStateService.updateStateEntity(this.active_passes_key, response, { ttl: this.ttl }))
    );
  }

  mockAndroidCredentials(): Observable<any> {
    return this.http
      .get<any>(paymentApiResources.credentialsDebug)
      .pipe(
        tap(response => this.storageStateService.updateStateEntity(this.android_cred_key, response, { ttl: this.ttl }))
      );
  }

  deleteCredentials(): Observable<any> {
    // get the mobile credential id that we want to delete.
    return this.storageStateService.getStateEntityByKey$<any>(this.android_cred_key).pipe(
      switchMap(data => {
        if (data) {
          const omniIdJwtTokenObs$ = this.omniIDJwtToken$().pipe(take(1));
          const institutionInfo$ = this.institutionFacadeService.cachedInstitutionInfo$.pipe(take(1));
          return forkJoin(institutionInfo$, omniIdJwtTokenObs$).pipe(
            switchMap(([institution, jwtToken]) => {
              const headers = new HttpHeaders({ Authorization: `Bearer ${jwtToken}` });
              const params = new HttpParams().set('institutionId', institution.id);
              return this.apiService
                .partnerHTTPCall(
                  RestCallType.delete,
                  `${paymentApiResources.credentials}/${data.value.id}`,
                  HttpResponseType.json,
                  null,
                  params,
                  headers
                )
                .pipe(
                  map(response => {
                    console.log('response from delete Credentials: ', response);
                    of(true);
                  })
                );
            })
          );
        }
        return of(null);
      })
    );
  }

  androidCredential(activePasses: any): Observable<any> {
    /**
     * makes call to partner payments api, resource: android/version/credential.
     *
     * @params requestBody: body required to call android credentials
     *
     * returns credentials for android user.
     */

    return this.storageStateService.getStateEntityByKey$<string>(this.android_cred_key).pipe(
      switchMap(data => {
        if (data != null && data.lastModified + data.timeToLive >= Date.now()) {
          return of(data.value);
        }

        const omniIdJwtTokenObs$ = this.omniIDJwtToken$().pipe(take(1));
        const institutionInfo$ = this.institutionFacadeService.cachedInstitutionInfo$.pipe(take(1));
        const deviceInfo$ = from(Device.getInfo()).pipe(take(1));
        return forkJoin(deviceInfo$, institutionInfo$, omniIdJwtTokenObs$)
          .pipe(
            switchMap(([deviceInfo, institution, jwtToken]) => {
              const headers = new HttpHeaders({ Authorization: `Bearer ${jwtToken}` });
              const params = new HttpParams().set('institutionId', institution.id);
              activePasses.deviceModel = deviceInfo.model;
              activePasses.osVersion = deviceInfo.osVersion;
              activePasses.manufacturer = deviceInfo.manufacturer;

              return this.apiService.partnerHTTPCall(
                RestCallType.post,
                paymentApiResources.credentials,
                HttpResponseType.json,
                activePasses,
                params,
                headers
              );
            })
          )
          .pipe(
            tap(response =>
              this.storageStateService.updateStateEntity(this.android_cred_key, response, { ttl: this.ttl })
            )
          );
      })
    );
  }
}
