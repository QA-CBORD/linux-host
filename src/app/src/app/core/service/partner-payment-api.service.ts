import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError, from, forkJoin } from 'rxjs';
import { StorageStateService } from '@core/states/storage/storage-state.service';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { take, map, switchMap, tap, catchError } from 'rxjs/operators';
import { Device } from '@capacitor/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { RestCallType, HttpResponseType, APIService } from '@core/service/api-service/api.service';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';


const api_version = "v1"

const paymentApiResources = {
  activePasses: `/android/${api_version}/activePasses`,
  credentials: `/android/${api_version}/credential`
}

@Injectable({
  providedIn: 'root'
})
export class PartnerPaymentApiService {

  constructor(private readonly institutionFacadeService: InstitutionFacadeService, private readonly apiService: APIService) { }



  androidActivePasses(omniIDToken: string, authBlob: string): Observable<any>{

    /**
     * @params omniIDToken -> jwt token needed to authenticate with partner payments api on aws. 
     * @params authBlob  -> authorization blob that contains ..... ??? 
     * calls api gw android/version/actipasses to obtain activaPasses info for current patron/user. 
     * this data is then used to get a credential for the patron/user.
     */
      // we need to send the institution id to activaPasses resource.
      const institutionInfo$ = this.institutionFacadeService.cachedInstitutionInfo$.pipe(take(1));
      // doing a forkJoin to ensure all requests actually complete, if one of these fails, the others are useless, just return error
      return institutionInfo$.pipe(switchMap((institution) => {
          // setting authorization for this request.
          const headers = new HttpHeaders({
            'Authorization': `Bearer ${omniIDToken}`, 
          }); 
          // the institution id is required for this request.
          const params = new HttpParams().set('institutionId', institution.id);
          // authBlob needs to be sent in request body.
          const requestBody = { authorizationBlob: authBlob }
          return this.apiService.partnerHTTPCall(RestCallType.post, 
            paymentApiResources.activePasses, HttpResponseType.json, requestBody, params, headers)
        }));
    }





    androidCredential(requestBody: { referenceIdentifier: string, device: { model: string, osVersion: string, manufacturer: string }}): Observable<any>{
      /**
       * makes call to partner payments api, resource: android/version/credential. 
       * 
       * @params requestBody: body required to call android credentials
       * 
       * returns credentials for android user.
       */
      return this.apiService.partnerHTTPCall(RestCallType.post, 
        paymentApiResources.credentials, HttpResponseType.json, requestBody)
    }   
}
