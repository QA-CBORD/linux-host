import { Injectable } from '@angular/core';
import { ServiceStateFacade } from '@core/classes/service-state-facade';
import { Observable, of, from } from 'rxjs';
import { UserApiService } from '@core/service/user-api/user-api.service';
import { UserInfo } from '@core/model/user/user-info.model';
import { UserPhotoInfo, UserPhotoList, UserSettingInfo } from '@core/model/user';
import { MessageResponse } from '@core/model/service/message-response.model';
import { StorageStateService } from '@core/states/storage/storage-state.service';
import { map, switchMap, tap, take, catchError } from 'rxjs/operators';
import { AddressInfo } from '@core/model/address/address-info';
import { NativeProvider, NativeData } from '@core/provider/native-provider/native.provider';
import { Settings } from 'src/app/app.global';
import { Device } from '@capacitor/core';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';

@Injectable({
  providedIn: 'root',
})
export class UserFacadeService extends ServiceStateFacade {
  private ttl: number = 600000; // 10min
  private userPhoto: UserPhotoInfo = null;
  private userKey = 'get_user';
  private userAddressKey = 'get_user_address';

  constructor(
    private readonly userApiService: UserApiService,
    private readonly storageStateService: StorageStateService,
    private readonly nativeProvider: NativeProvider,
    private readonly settingsFacadeService: SettingsFacadeService,
  ) {
    super();
  }

  getUserData$(): Observable<UserInfo> {
    return this.storageStateService.getStateEntityByKey$<UserInfo>(this.userKey).pipe(
      switchMap(data => {
        if (data !== null && data.lastModified + data.timeToLive >= Date.now()) {
          return this.storageStateService.getStateEntityByKey$<UserInfo>(this.userKey).pipe(map(({ value }) => value));
        }
        return this.getUser$();
      }),
      take(1)
    );
  }

  getUser$(): Observable<UserInfo> {
    return this.userApiService
      .getUser()
      .pipe(tap(res => this.storageStateService.updateStateEntity(this.userKey, res, this.ttl)));
  }

  getUserPhoto$(userId: string): Observable<MessageResponse<UserPhotoInfo>> {
    return this.userApiService.getUserPhoto(userId);
  }

  getUserAddresses$(): Observable<AddressInfo[]> {
    return this.userApiService
      .getUserAddresses()
      .pipe(tap(res => this.storageStateService.updateStateEntity(this.userAddressKey, res, this.ttl)));
  }

  createUserPin(pin: string): Observable<boolean> {
    return from(Device.getInfo())
      .pipe(
        switchMap(({uuid}) => this.userApiService.createUserPin(pin, uuid)),
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

  getPhotoListByUserId(userId: string): Observable<MessageResponse<UserPhotoList>> {
    return this.userApiService.getPhotoListByUserId(userId);
  }

  getPhotoById(photoId: string): Observable<MessageResponse<UserPhotoInfo>> {
    return this.userApiService.getPhotoById(photoId);
  }

  setAcceptedPhoto(acceptedPhoto: UserPhotoInfo) {
    this.userPhoto = acceptedPhoto;
  }

  getAcceptedPhoto$(): Observable<UserPhotoInfo> {
    // if (this.userPhoto) return of(this.userPhoto);

    let nativeProviderFunction: Observable<UserPhotoInfo>;

    const userPhotoInfoObservable: Observable<UserPhotoInfo> = this.getUserData$().pipe(
      switchMap(({ id }: UserInfo) => this.getPhotoListByUserId(id)),
      map(({ response: { list } }) => this.getPhotoIdByStatus(list)),
      switchMap(({ id }: UserPhotoInfo) => this.getPhotoById(id)),
      map(({ response }) => (this.userPhoto = response))
    );

    nativeProviderFunction = userPhotoInfoObservable;

    return nativeProviderFunction.pipe(
      catchError(e => {
        return userPhotoInfoObservable;
      }),
      switchMap(userPhotoInfo => {
        if (userPhotoInfo) {
          return of(userPhotoInfo);
        } else {
          return userPhotoInfoObservable;
        }
      })
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
}
