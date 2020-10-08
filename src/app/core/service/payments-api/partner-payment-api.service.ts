import { Injectable } from '@angular/core';
import { forkJoin, from, Observable, of } from 'rxjs';
import { take, switchMap, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { RestCallType, HttpResponseType, APIService } from '@core/service/api-service/api.service';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
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
  constructor(
    private readonly institutionFacadeService: InstitutionFacadeService,
    private readonly apiService: APIService,
    private http: HttpClient
  ) {}


  androidActivePasses(omniIDToken: string, requestBody: { authorizationBlob: any }): Observable<any> {
    /**
     * @params omniIDToken -> jwt token needed to authenticate with partner payments api on aws.
     * @params authBlob  -> authorization blob that contains ..... ???
     * calls api gw android/version/actipasses to obtain activaPasses info for current patron/user.
     * this data is then used to get a credential for the patron/user.
     */
    // we need to send the institution id to activaPasses resource.
    const institutionInfo$ = this.institutionFacadeService.cachedInstitutionInfo$;
    // doing a forkJoin to ensure all requests actually complete, if one of these fails, the others are useless, just return error
    return institutionInfo$.pipe(
      switchMap(({ id }) => {
        const headers = new HttpHeaders({ Authorization: `Bearer ${omniIDToken}` });
        // the institution id is required for this request.
        const params = new HttpParams().set('institutionId', id);
        // authBlob needs to be sent in request body.
        return this.apiService.partnerHTTPCall(
          RestCallType.post,
          paymentApiResources.activePasses,
          HttpResponseType.json,
          requestBody,
          params,
          headers
        );
      })
    );
  }

  mockActivePasses(): Observable<any> {
    return this.http.get<any>(paymentApiResources.activePassesDebug).pipe(
      map(({ credStatus, passes, referenceIdentifier }) => {
        return { credStatus, passes, referenceIdentifier };
      })
    );
  }

  mockAndroidCredentials(): Observable<any> {
    return this.http
      .get<any>(paymentApiResources.credentialsDebug)
  }

  deleteCredentials(jwtOmniIDToken: string, credentialId: string): Observable<any> {
    // get the mobile credential id that we want to delete.
          const institutionInfo$ = this.institutionFacadeService.cachedInstitutionInfo$;
          return institutionInfo$.pipe(
            switchMap(({ id }) => {
              const headers = new HttpHeaders({ Authorization: `Bearer ${jwtOmniIDToken}` });
              const params = new HttpParams().set('institutionId', id);
              return this.apiService
                .partnerHTTPCall(
                  RestCallType.delete,
                  `${paymentApiResources.credentials}/${credentialId}`,
                  HttpResponseType.json,
                  null,
                  params,
                  headers
                )
                .pipe(
                  map(response => {
                    of(true);
                  })
                );
            })
          );
  }


  updateCredential(jwtOmniIDToken: string, reqBody: any): Observable<any>{
  
    const institutionInfo$ = this.institutionFacadeService.cachedInstitutionInfo$.pipe(take(1));
    const deviceInfo$ = from(Device.getInfo()).pipe(take(1));
    return forkJoin(institutionInfo$, deviceInfo$).pipe(
       switchMap(([{ id }, { manufacturer, model, osVersion }]) => {
        const headers = new HttpHeaders({ Authorization: `Bearer ${jwtOmniIDToken}` });
        const params = new HttpParams().set('institutionId', id);
          const body = {
            ...reqBody,
            device: {
              manufacturer,
              model,
              osVersion
            },
          }
          return this.apiService.partnerHTTPCall(
            RestCallType.put,
            `${paymentApiResources.credentials}/${body.credentialID}`,
              HttpResponseType.json,
              body,
              params,
              headers
          )
    }));

  }


  androidCredential(jwtOmniIDToken: string, referenceIdentifier: string): Observable<any> {
    /**
     * makes call to partner payments api, resource: android/version/credential.
     *
     * @params referenceIdentifier: body required to call android credentials
     *
     * returns credentials for android user.
     */
    const institutionInfo$ = this.institutionFacadeService.cachedInstitutionInfo$.pipe(take(1));
    const deviceInfo$ = from(Device.getInfo()).pipe(take(1));
    return forkJoin(deviceInfo$, institutionInfo$).pipe(
      switchMap(([deviceInfo, { id }]) => {
        const headers = new HttpHeaders({ Authorization: `Bearer ${jwtOmniIDToken}` });
        const params = new HttpParams().set('institutionId', id);
        const requestBody = {
          referenceIdentifier,
          device: {
            manufacturer: deviceInfo.manufacturer,
            model: deviceInfo.model,
            osVersion: deviceInfo.osVersion,
          },
        };
        return this.apiService.partnerHTTPCall(
          RestCallType.post,
          paymentApiResources.credentials,
          HttpResponseType.json,
          requestBody,
          params,
          headers
        );
      })
    );
  }
}
