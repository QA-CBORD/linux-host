import { Injectable } from '@angular/core';
import { PartnerPaymentApiService } from './partner-payment-api.service';
import { Observable, from, throwError, forkJoin, zip, of } from 'rxjs';
import { Device } from '@capacitor/core';
import { switchMap, take, map, catchError, tap } from 'rxjs/operators';
import { StorageStateService } from '@core/states/storage/storage-state.service';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';

@Injectable({
  providedIn: 'root'
})
export class PartnerPaymentApiFacadeService {

  private ttl: number = 600000; // 10min
  private jwtToken_key: string = 'jwt_token';
  private authBlob_key: string = 'auth_blob';

  constructor(
    private partnerPaymentApi: PartnerPaymentApiService, 
    private readonly storageStateService: StorageStateService, private readonly authFacadeService: AuthFacadeService) { }


  omniIDJwtToken$(): Observable<string>{
    return this.storageStateService.getStateEntityByKey$<string>(this.jwtToken_key)
     .pipe(switchMap(data => { 
       if (data != null && data.lastModified + data.timeToLive >= Date.now())
            return of(data.value)
        console.log('inside omniIDJwtToken')
       return this.retrieveOmniIDJwtToken$();
     }));
   }

  retrieveOmniIDJwtToken$(): Observable<string>{
    return this.authFacadeService.getExternalAuthenticationToken$("OmniID").pipe(
      tap(data => this.storageStateService.updateStateEntity(this.jwtToken_key, data, { ttl: this.ttl})));
   }

  authorizationBlob$(deviceModel: string, osVersion: string): Observable<string>{
    return this.storageStateService.getStateEntityByKey$<string>(this.authBlob_key).pipe(
      switchMap(data => { 
       if (data != null && data.lastModified + data.timeToLive >= Date.now())
            return of(data.value) 
       console.log('inside authorizationBlob')
       return this.retrieveAuthorizationBlob$(deviceModel, osVersion); 
     }));
   }
   
  retrieveAuthorizationBlob$(deviceModel: string, osVersion: string) : Observable<string>{
      return  this.authFacadeService
                  .retrieveAuthorizationBlob(deviceModel, osVersion).pipe(
                    map(({ response }) => response),
                    tap(response => this.storageStateService.updateStateEntity(this.authBlob_key, response, { ttl: this.ttl})));
   }
   

  androidActivePasses(): Observable<any | {passes: object, referenceIdentifier: string, credStatus: object, deviceModel: string, osVersion: string, manufacturer: string}>{

    /**
     * calls api gw android/version/actipasses to obtain activaPasses info for current patron/user. 
     * this data is then used to get a credential for the patron/user.
     */
    return from(Device.getInfo()).pipe(switchMap(({ model, osVersion, manufacturer }) => {
      // doing a forkJoin to ensure all requests actually complete, if one of these fails, the others are useless, just return error
      let omniIDJwtToken$ = this.omniIDJwtToken$().pipe(take(1))
      let authorizationBlob$ = this.authorizationBlob$(model, osVersion).pipe(take(1));
      return forkJoin(omniIDJwtToken$, authorizationBlob$).pipe(switchMap(([jwtToken, authBlob]) => {
               return this.partnerPaymentApi.androidActivePasses(jwtToken, authBlob)
                          .pipe(map(data => {
                            return {
                                passes: data.passes,
                                referenceIdentifier: data.referenceIdentifier,
                                credStatus: data.credStatus,
                                deviceModel: model,
                                osVersion: osVersion,
                                manufacturer: manufacturer
                            }  
                }))
          }));
   }));
}






  androidCredential(): Observable<any>{
    /**
     * uses data obtained from activePasses to Create/allocate a credential for native Android use
     *
     */
    console.log('goin to call androidActivePasses()')
   return this.androidActivePasses().pipe(
     switchMap((activePassesResponse) => { 
       const androidCredentialRequestBody = { 
         referenceIdentifier: activePassesResponse.referenceIdentifier,
         device: { model: activePassesResponse.deviceModel, osVersion: activePassesResponse.osVersion, manufacturer: activePassesResponse.manufacturer}
         }
         return this.partnerPaymentApi.androidCredential(androidCredentialRequestBody)
                    .pipe(map(data => data))
       }),
       catchError(error => throwError(error))
     );
   }
}
