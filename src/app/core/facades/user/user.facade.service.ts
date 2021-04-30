import { Injectable } from '@angular/core';
import { ServiceStateFacade } from '@core/classes/service-state-facade';
import { Observable, of, from, iif, zip } from 'rxjs';
import { UserApiService } from '@core/service/user-api/user-api.service';
import { UserInfo } from '@core/model/user/user-info.model';
import { UserPhotoInfo, UserPhotoList, UserNotificationInfo } from '@core/model/user';
import { MessageResponse } from '@core/model/service/message-response.model';
import { StorageStateService } from '@core/states/storage/storage-state.service';
import { map, switchMap, tap, take, catchError, finalize } from 'rxjs/operators';
import { AddressInfo } from '@core/model/address/address-info';
import { NativeProvider } from '@core/provider/native-provider/native.provider';
import { Settings, User } from 'src/app/app.global';
import { Plugins, Capacitor, PushNotificationToken, PushNotification } from '@capacitor/core';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { UserSettingsStateService } from '@core/states/user-settings/user-settings-state.service';
import { PLATFORM } from '@shared/accessibility/services/accessibility.service';
import { BarcodeService } from '@core/service/barcode/barcode.service';
const { PushNotifications, LocalNotifications, Device } = Plugins;

@Injectable({
  providedIn: 'root',
})
export class UserFacadeService extends ServiceStateFacade {
  private ttl: number = 600000; // 10min
  private userPhoto: UserPhotoInfo = null;
  private userKey = 'get_user';
  private userAddressKey = 'get_user_address';
  private fcmTokenKey = 'fcm_token';

  constructor(
    private readonly userApiService: UserApiService,
    private readonly storageStateService: StorageStateService,
    private readonly nativeProvider: NativeProvider,
    private readonly settingsFacadeService: SettingsFacadeService,
    private readonly userSettingStateService: UserSettingsStateService,
    private readonly pingEncoderService: BarcodeService
  ) {
    super();
  }

  getUserData$(): Observable<UserInfo> {
    return this.getUserState$().pipe(take(1));
  }

  getUserState$(): Observable<UserInfo> {
    return this.storageStateService.getStateEntityByKey$<UserInfo>(this.userKey).pipe(
      switchMap(data => {
        if (data !== null && data.lastModified + data.timeToLive >= Date.now()) {
          return this.storageStateService.getStateEntityByKey$<UserInfo>(this.userKey).pipe(map(({ value }) => value));
        }
        return this.getUser$();
      })
    );
  }

  getUser$(): Observable<UserInfo> {
    return this.userApiService
      .getUser()
      .pipe(
        tap(res =>
          this.storageStateService.updateStateEntity(this.userKey, res, { ttl: this.ttl, highPriorityKey: true })
        )
      );
  }

  //adds a photo and takes a UsrPhotoInfo object
  addUserPhoto(photo: UserPhotoInfo): Observable<boolean> {
    return this.getUserData$().pipe(
      switchMap(({ id }) => this.userApiService.addUserPhoto(id, photo)),
      map(({ response }) => response),
      take(1)
    );
  }

  getUserAddresses$(): Observable<AddressInfo[]> {
    return this.userApiService
      .getUserAddresses()
      .pipe(tap(res => this.storageStateService.updateStateEntity(this.userAddressKey, res, { ttl: this.ttl })));
  }

  createUserPinTotp(pin: string): Observable<boolean> {
    return this.pingEncoderService.encodePin(pin)
        .pipe(
          switchMap((encrytedPin) => this.createUserPin(encrytedPin))
        );
  }

  createUserPin(pin: string): Observable<boolean> {
    return from(Device.getInfo()).pipe(
      switchMap(({ uuid }) => this.userApiService.createUserPin(pin, uuid)),
      map(({ response }) => response),
      take(1)
    );
  }

  requestDeposit$(
    recipientName: string,
    recipientEmail: string,
    message: string,
    depositToAccountId: string,
    requestAmount: string
  ) {
    return this.userApiService.requestDeposit(
      recipientName,
      recipientEmail,
      message,
      depositToAccountId,
      requestAmount
    );
  }

  getPhotoList(): Observable<UserPhotoList> {
    return this.getUserData$().pipe(
      switchMap(({ id }: UserInfo) => this.userApiService.getPhotoListByUserId(id)),
      map(({ response }) => response),
      take(1)
    );
  }

  getPhotoListByUserId(userId: string): Observable<MessageResponse<UserPhotoList>> {
    return this.userApiService.getPhotoListByUserId(userId);
  }

  getPhotoById(photoId: string): Observable<UserPhotoInfo> {
    return this.userApiService.getPhotoById(photoId).pipe(
      map(({ response }) => response),
      take(1)
    );
  }

  setAcceptedPhoto(acceptedPhoto: UserPhotoInfo) {
    this.userPhoto = acceptedPhoto;
  }

  getAcceptedPhoto$(): Observable<UserPhotoInfo> {
    return this.userApiService.getUserPhoto(null).pipe(
      map(response => response.response),
      tap(userPhoto => this.setAcceptedPhoto(userPhoto))
    );
  }

  isApplePayEnabled$(): Observable<boolean> {
    return this.nativeProvider.isIos()
      ? this.settingsFacadeService.getSetting(Settings.Setting.APPLE_PAY_ENABLED).pipe(
          map(({ value }) => Boolean(Number(value))),
          take(1)
        )
      : of(false);
  }

  isAppleWalletEnabled$(): Observable<boolean> {
    return this.nativeProvider.isIos()
      ? this.settingsFacadeService.getSetting(Settings.Setting.APPLE_WALLET_ENABLED).pipe(
          map(({ value }) => Boolean(Number(value))),
          take(1)
        )
      : of(false);
  }

  private getPhotoIdByStatus(photoList: UserPhotoInfo[], status: number = 1): UserPhotoInfo | undefined {
    return photoList.find((photo: UserPhotoInfo) => photo.status === status);
  }

  updateUserPhotoStatus(photoId: string, status: number, reason: string): Observable<boolean> {
    return this.userApiService.updateUserPhotoStatus(photoId, status, reason).pipe(
      map(({ response }) => response),
      take(1)
    );
  }

  handlePushNotificationRegistration() {
    zip(this.isPushNotificationEnabled$(), this.getFCMToken$())
      .pipe(
        switchMap(([pushNotificationsEnabled, fcmToken]) => {
          return iif(
            () => pushNotificationsEnabled && !fcmToken,
            from(PushNotifications.requestPermission()),
            of({ granted: false })
          );
        }),
        take(1)
      )
      .subscribe(result => {
        if (result.granted) {
          PushNotifications.removeAllListeners();
          PushNotifications.addListener('pushNotificationReceived', (notification: PushNotification) => {
            if (Capacitor.platform === PLATFORM.android) {
              LocalNotifications.schedule({
                notifications: [
                  {
                    title: notification.title,
                    body: notification.body,
                    id: Date.now(),
                    smallIcon: '@drawable/ic_launcher_round',
                  },
                ],
              });
            }
          });
          PushNotifications.addListener('registration', (token: PushNotificationToken) => {
            this.saveNotification$(token.value).subscribe();
          });
          PushNotifications.register();
        }
      });
  }

  saveNotification$(fcmToken: string): Observable<string> {
    this.setFCMToken(fcmToken);
    return this.getUserData$().pipe(
      switchMap(userInfo => {
        return this.userApiService.saveNotification$(userInfo.id, this.getPushNotificationInfo(userInfo, fcmToken));
      }),
      take(1)
    );
  }

  logoutAndRemoveUserNotification(): Observable<boolean> {
    return zip(this.getUserData$(), this.getFCMToken$()).pipe(
      switchMap(([userInfo, fcmToken]) => {
        if (fcmToken) {
          PushNotifications.removeAllDeliveredNotifications();
          return this.userApiService.logoutAndRemoveUserNotification$(
            userInfo.id,
            this.getPushNotificationInfo(userInfo, fcmToken)
          );
        }
        return of(false);
      }),
      take(1),
      catchError(() => of(false)),
      finalize(() => this.clearData())
    );
  }

  /// get notification id for update if it already exists in the user notification array
  private getPushNotificationInfo(userInfo: any, fcmToken: string): UserNotificationInfo {
    const user: any = { ...userInfo };
    const pNotifications = user.userNotificationInfoList.filter(
      notif => notif.type === User.NotificationType.PUSH_NOTIFICATION
    );
    return {
      id: pNotifications.length > 0 ? pNotifications[0].id : null,
      type: User.NotificationType.PUSH_NOTIFICATION,
      value: fcmToken,
      provider: Capacitor.platform,
    };
  }

  isPushNotificationEnabled$(): Observable<boolean> {
    return this.settingsFacadeService.getSetting(Settings.Setting.PUSH_NOTIFICATION_ENABLED).pipe(
      map(({ value }) => Boolean(Number(value))),
      take(1)
    );
  }

  getFCMToken$(): Observable<string> {
    return this.storageStateService
      .getStateEntityByKey$<string>(this.fcmTokenKey)
      .pipe(map(data => (data && data.value ? data.value : null)));
  }

  saveUser$(user: UserInfo): Observable<string> {
    return this.userApiService.updateUserInfo$(user).pipe(
      tap(res => this.storageStateService.updateStateEntity(this.userKey, user, { ttl: this.ttl })),
      take(1)
    );
  }

  reportCard$(isReportAsLost: boolean): Observable<MessageResponse<string>> {
    return this.userApiService.reportCard$(isReportAsLost).pipe(take(1));
  }

  changePassword$(oldPassword: string, newPassword: string): Observable<boolean> {
    return this.userApiService.changePassword$(oldPassword, newPassword).pipe(take(1));
  }

  private setFCMToken(value: string) {
    this.storageStateService.updateStateEntity(this.fcmTokenKey, value, { ttl: this.ttl });
  }

  private async clearData(): Promise<void> {
    this.userPhoto = null;
    this.storageStateService.clearState();
    this.storageStateService.clearStorage();
    this.userSettingStateService.clearState();
  }
}
