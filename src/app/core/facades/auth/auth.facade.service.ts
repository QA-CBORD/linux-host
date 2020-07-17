import { Injectable } from '@angular/core';
import { map, switchMap, tap } from 'rxjs/operators';
import { ServiceStateFacade } from '@core/classes/service-state-facade';
import { AuthApiService } from '@core/service/auth-api/auth-api.service';
import { UserLogin } from '@core/model/user';
import { StorageStateService } from '@core/states/storage/storage-state.service';
import { Observable, of, iif, from } from 'rxjs';
import { StorageEntity } from '@core/classes/extendable-state-manager';
import { Device } from '@capacitor/core';
import { ROLES } from '../../../app.global';
import { GUEST_ROUTES } from '../../../non-authorized/non-authorized.config';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { IdentityFacadeService } from '@core/facades/identity/identity.facade.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthFacadeService extends ServiceStateFacade {
  private ttl: number = 600000; // 10min
  private sessionIdKey = 'get_sessionId';
  private systemSessionId = null;

  constructor(
    private readonly authApiService: AuthApiService,
    private readonly storageStateService: StorageStateService,
  ) {
    super();
  }

  getAuthSessionToken$(): Observable<string> {
    return iif(() => this.systemSessionId === null, this.authenticateSystem$(), of(this.systemSessionId));
  }

  get cachedAuthSessionToken$(): Observable<string | null> {
    return this.storageStateService
      .getStateEntityByKey$<string>(this.sessionIdKey)
      .pipe(map(data => (this.isValidData(data) ? data.value : null)));
  }

  authenticateUser$(userCredentials: UserLogin): Observable<string> {
    return this.authApiService
      .authenticateUser(userCredentials)
      .pipe(tap(res => this.storageStateService.updateStateEntity(this.sessionIdKey, res, this.ttl)));
  }

  authenticatePin$(pin: string): Observable<boolean> {
    return from(Device.getInfo())
      .pipe(
        switchMap(({uuid}) => this.authApiService.authenticatePin(pin, uuid)),
        tap(res => this.storageStateService.updateStateEntity(this.sessionIdKey, res, this.ttl)),
        map(res => !!res)
      );
  }

  authenticateSessionToken$(sessionToken: string): Observable<string> {
    return this.authApiService.authenticateSessionToken(sessionToken);
  }

  authenticateSystem$(): Observable<string> {
    return this.authApiService.authenticateSystem().pipe(tap(res => (this.systemSessionId = res)));
  }

  getAuthenticationToken$(): Observable<string> {
    return this.authApiService.getAuthenticationToken();
  }

  getExternalAuthenticationToken$(): Observable<string> {
    return this.authApiService.getExternalAuthenticationToken();
  }

  retrieveAuthorizationBlob(deviceModel: string, deviceOSVersion: string): Observable<string> {
    return this.authApiService.retrieveAuthorizationBlob(deviceModel, deviceOSVersion);
  }

  private isValidData(data: StorageEntity): boolean {
    return data !== null && data.lastModified + data.timeToLive >= Date.now();
  }
}
