import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Device } from '@capacitor/core';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { APIService, HttpResponseType, RestCallType } from '@core/service/api-service/api.service';
import { StorageStateService } from '@core/states/storage/storage-state.service';
import { forkJoin, from, Observable, of } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { ActivePasses } from './credential-utils';
import { MobileCredential } from './mobile-credential';
import { MobileCredentialFactory } from './mobile-credential-factory';

const api_version = 'v1';
const resourceUrls = {
  activePasses: `/android/${api_version}/activePasses`,
};

@Injectable()
export class MobileCredentialDataService {
  protected ttl: number = 600000; // 10min
  protected jwtToken_key: string = 'jwt_token';
  protected authBlob_key: string = 'auth_blob';
  protected credential_key: string = 'mobile_credential';

  constructor(
    protected readonly storageStateService: StorageStateService,
    protected readonly authFacadeService: AuthFacadeService,
    protected readonly institutionFacadeService: InstitutionFacadeService,
    protected readonly apiService: APIService
  ) {}

  protected retrieveAuthorizationBlob$(deviceModel: string, osVersion: string): Observable<string> {
    return this.authFacadeService.retrieveAuthorizationBlob(deviceModel, osVersion).pipe(
      map(({ response }) => response),
      tap(response => this.storageStateService.updateStateEntity(this.authBlob_key, response, { ttl: this.ttl }))
    );
  }

  protected omniIDJwtToken$(): Observable<string> {
    return this.storageStateService.getStateEntityByKey$<string>(this.jwtToken_key).pipe(
      switchMap(data => {
        if (data != null && data.lastModified + data.timeToLive >= Date.now()) {
          return of(data.value);
        }
        return this.retrieveOmniIDJwtToken$();
      })
    );
  }

  protected retrieveOmniIDJwtToken$(): Observable<string> {
    return this.authFacadeService
      .getExternalAuthenticationToken$('OmniID')
      .pipe(tap(data => this.storageStateService.updateStateEntity(this.jwtToken_key, data, { ttl: this.ttl })));
  }

  protected authorizationBlob$(): Observable<string> {
    return this.storageStateService.getStateEntityByKey$<string>(this.authBlob_key).pipe(
      switchMap(data => {
        if (data != null && data.lastModified + data.timeToLive >= Date.now()) {
          return of(data.value);
        }
        return from(Device.getInfo()).pipe(
          switchMap(({ model, osVersion }) => {
            return this.retrieveAuthorizationBlob$(model, osVersion);
          })
        );
      })
    );
  }

  activePasses$(): Observable<MobileCredential> {
    console.log('activePasses ===== ')
    return this.getActivePasses().pipe(
      map((activePasses) => {
        console.log('activePasses ****: ', activePasses)
        return  MobileCredentialFactory.fromActivePasses(activePasses);
      })
    );
  }

  private getActivePasses(): Observable<ActivePasses> {
    /**
     * calls api gw android/version/actipasses to obtain activaPasses info for current patron/user.
     * this data is then used to get a credential for the patron/user.
     */
    // doing a forkJoin to ensure all requests actually complete, if one of these fails, the others are useless, just return error
    console.log('getActivePasses ****: ')
    let omniIDJwtToken$ = this.omniIDJwtToken$().pipe(take(1));
    let authorizationBlob$ = this.authorizationBlob$().pipe(take(1));
    return forkJoin(omniIDJwtToken$, authorizationBlob$).pipe(
      switchMap(([omniIDJwtToken, authBlob]) => {
        console.log('getActivePasses ****: ', omniIDJwtToken)
        const requestBody = { authorizationBlob: authBlob };
        return this.getPasses(omniIDJwtToken, requestBody);
      })
    );
  }

  private getPasses(omniIDToken: string, requestBody: { authorizationBlob: any }): Observable<any> {
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
          resourceUrls.activePasses,
          HttpResponseType.json,
          requestBody,
          params,
          headers
        );
      })
    );
  }
}
