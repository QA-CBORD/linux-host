import { Injectable } from '@angular/core';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { ServiceStateFacade } from '@core/classes/service-state-facade';
import { AuthApiService } from '@core/service/auth-api/auth-api.service';
import { UserLogin } from '@core/model/user';
import { StorageStateService } from '@core/states/storage/storage-state.service';
import { Observable, of, iif, from } from 'rxjs';
import { Plugins } from '@capacitor/core';
import { GuestSetting } from '@sections/guest/model/guest-settings';
const { Device } = Plugins;

@Injectable({
  providedIn: 'root',
})
export class AuthFacadeService extends ServiceStateFacade {
  private sessionIdKey = 'get_sessionId';
  private isGuestUserKey = 'isGuestUser';
  private guestSettingKey = 'guestSetting';

  private systemSessionId = null;

  constructor(
    private readonly authApiService: AuthApiService,
    private readonly storageStateService: StorageStateService
  ) {
    super();
  }

  getAuthSessionToken$(): Observable<string> {
    return iif(() => this.systemSessionId === null, this.authenticateSystem$(), of(this.systemSessionId));
  }

  get cachedAuthSessionToken$(): Observable<string | null> {
    return this.storageStateService
      .getStateEntityByKey$<string>(this.sessionIdKey)
      .pipe(map(data => (data ? data.value : null)));
  }

  private get nonNullGuestSetting(): GuestSetting {
    return {
      canLogin: false,
      canDeposit: false,
      canOrder: false,
      canExplore: false,
    };
  }

  setIsGuestUser(asGuest: boolean) {
    this.storageStateService.updateStateEntity(this.isGuestUserKey, asGuest, { highPriorityKey: true });
  }

  isGuestUser(): Observable<boolean> {
    return this.storageStateService.getStateEntityByKey$<string>(this.isGuestUserKey).pipe(
      map(data => (data && !!data.value)),
      catchError(() => of(false)),
      take(1)
    );
  }

  getGuestSettings(): Observable<GuestSetting> {
    return this.storageStateService.getStateEntityByKey$<GuestSetting>(this.guestSettingKey).pipe(
      map(data => (data && data.value) || this.nonNullGuestSetting),
      catchError(() => of(this.nonNullGuestSetting)),
      take(1)
    );
  }

  set cachedAuthSessionToken(sessionId: string) {
    this.storageStateService.updateStateEntity(this.sessionIdKey, sessionId, { highPriorityKey: true });
  }

  saveGuestSetting(settings: GuestSetting) {
    this.storageStateService.updateStateEntity(this.guestSettingKey, settings, { highPriorityKey: true });
  }

  removeGuestSetting() {
    this.storageStateService.deleteStateEntityByKey(this.guestSettingKey);
  }

  authenticateUser$(userCredentials: UserLogin): Observable<string> {
    return this.authApiService
      .authenticateUser(userCredentials)
      .pipe(tap(res => this.storageStateService.updateStateEntity(this.sessionIdKey, res, { highPriorityKey: true })));
  }

  authenticatePin$(pin: string): Observable<boolean> {
    return from(Device.getInfo()).pipe(
      switchMap(({ uuid }) => this.authApiService.authenticatePin(pin, uuid)),
      tap(res => this.storageStateService.updateStateEntity(this.sessionIdKey, res, { highPriorityKey: true })),
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

  getExternalAuthenticationToken$(externalSystem: string = null): Observable<string> {
    return this.authApiService.getExternalAuthenticationToken(externalSystem);
  }

  retrieveAuthorizationBlob(deviceModel: string, deviceOSVersion: string): Observable<any> {
    return this.authApiService.retrieveAuthorizationBlob(deviceModel, deviceOSVersion);
  }
}
