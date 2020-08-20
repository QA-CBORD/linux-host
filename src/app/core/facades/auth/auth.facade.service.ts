import { Injectable } from '@angular/core';
import { map, switchMap, tap } from 'rxjs/operators';
import { ServiceStateFacade } from '@core/classes/service-state-facade';
import { AuthApiService } from '@core/service/auth-api/auth-api.service';
import { UserLogin } from '@core/model/user';
import { StorageStateService } from '@core/states/storage/storage-state.service';
import { Observable, of, iif, from } from 'rxjs';
import { StorageEntity } from '@core/classes/extendable-state-manager';
import { Device } from '@capacitor/core';

@Injectable({
  providedIn: 'root',
})
export class AuthFacadeService extends ServiceStateFacade {
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
      .pipe(map(data => data ? data.value : null));
  }

  set cachedAuthSessionToken(sessionId: string){
    this.storageStateService.updateStateEntity(this.sessionIdKey, sessionId, { highPriorityKey: true });
  }

  authenticateUser$(userCredentials: UserLogin): Observable<string> {
    return this.authApiService
      .authenticateUser(userCredentials)
      .pipe(
        tap(res =>
          this.storageStateService.updateStateEntity(this.sessionIdKey, res, { highPriorityKey: true })
        )
      );
  }

  authenticatePin$(pin: string): Observable<boolean> {
    return from(Device.getInfo()).pipe(
      switchMap(({ uuid }) => this.authApiService.authenticatePin(pin, uuid)),
      tap(res =>
        this.storageStateService.updateStateEntity(this.sessionIdKey, res, { highPriorityKey: true })
      ),
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

}
