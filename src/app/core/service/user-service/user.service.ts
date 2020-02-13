import { Injectable } from '@angular/core';

import { catchError, map, switchMap, take } from 'rxjs/operators';
import { BehaviorSubject, from, Observable, of } from 'rxjs';

import { BaseService } from '../base-service/base.service';
import { UserInfo } from 'src/app/core/model/user/user-info.model';
import { AddressInfoList, UserPhotoInfo, UserPhotoList, UserSettingInfo } from '../../model/user';
import { MessageResponse } from '../../model/service/message-response.model';
import { HttpClient } from '@angular/common/http';
import { NativeData, NativeProvider } from '@core/provider/native-provider/native.provider';
import { AddressInfo } from '@core/model/address/address-info';
import { ContentStringRequest } from '@core/model/content/content-string-request.model';
import { SettingInfo } from '@core/model/configuration/setting-info.model';
import { ConfigurationService } from 'src/app/core/service/configuration/configuration.service';
import { Settings } from 'src/app/app.global';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService {
  private readonly serviceUrl = '/json/user';
  private readonly userData$: BehaviorSubject<UserInfo> = new BehaviorSubject<UserInfo>(<UserInfo>{});
  private readonly userAddresses$: BehaviorSubject<AddressInfo[]> = new BehaviorSubject<AddressInfo[]>([]);
  private userPhoto: UserPhotoInfo = null;
  selectedAddress: AddressInfo;

  constructor(
    readonly http: HttpClient, 
    readonly configService: ConfigurationService,
    private readonly nativeProvider: NativeProvider) {
    super(http);
  }

  private set _userData(userInfo: UserInfo) {
    this.userData$.next({ ...userInfo });
  }

  public setUserData(userInfo: UserInfo) {
    this._userData = userInfo;
  }

  get userData(): Observable<UserInfo> {
    return this.userData$.asObservable();
  }

  private set _userAddresses(userAddresses: AddressInfo[]) {
    this.userAddresses$.next(userAddresses);
  }

  get userAddresses(): Observable<AddressInfo[]> {
    return this.userAddresses$.asObservable();
  }

  getUser(): Observable<UserInfo> {
    return this.httpRequest(this.serviceUrl, 'retrieve', true).pipe(map(({ response }) => (this._userData = response)));
  }

  getUserSettingsBySettingName(settingName: string): Observable<UserSettingInfo> {
    return this.httpRequest<MessageResponse<UserSettingInfo>>(this.serviceUrl, 'retrieveSetting', true, {
      settingName,
    }).pipe(map(({ response }) => response));
  }

  saveUserSettingsBySettingName(settingName: string, settingValue: string): Observable<MessageResponse<boolean>> {
    return this.httpRequest<MessageResponse<boolean>>(this.serviceUrl, 'saveSetting', true, {
      settingName,
      settingValue,
    });
  }

  getSettingByConfig(config: ContentStringRequest): Observable<SettingInfo> {
    const methodName = 'retrieveSetting';

    return this.userData.pipe(
      switchMap(({ institutionId }) => this.httpRequestFull(this.serviceUrl, methodName, true, institutionId, config)),
      map(({ response }: MessageResponse<SettingInfo>) => response),
    );
  }

  setAcceptedPhoto(acceptedPhoto: UserPhotoInfo) {
    this.userPhoto = acceptedPhoto;
  }

  getAcceptedPhoto(): Observable<UserPhotoInfo> {
    if (this.userPhoto) return of(this.userPhoto);

    let nativeProviderFunction: Observable<UserPhotoInfo>;

    const userPhotoInfoObservable: Observable<UserPhotoInfo> = this.getUser().pipe(
      switchMap(({ id }: UserInfo) => this.getPhotoListByUserId(id)),
      map(({ response: { list } }) => this.getPhotoIdByStatus(list)),
      switchMap(({ id }: UserPhotoInfo) => this.getPhotoById(id)),
      map(({ response }) => (this.userPhoto = response)),
    );

    if (this.nativeProvider.isAndroid()) {
      nativeProviderFunction = of(this.nativeProvider.getAndroidData(NativeData.USER_PHOTO)).pipe(
        map((data: any) => JSON.parse(data)),
      );
    } else if (this.nativeProvider.isIos()) {
      nativeProviderFunction = from(this.nativeProvider.getIosData(NativeData.USER_PHOTO)).pipe(
        map((data: any) => JSON.parse(data)),
      );
    } else {
      nativeProviderFunction = userPhotoInfoObservable;
    }

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
      }),
    );
  }

  isApplePayEnabled$(): Observable<boolean> {
    return (this.nativeProvider.isIos()) ? this.userData.pipe(
      switchMap(({ institutionId }) => {
        return this.configService.getSetting(institutionId, Settings.Setting.APPLE_PAY_ENABLED)
      }),
      map(( { value } ) => Boolean(Number(value))),
      take(1)
    ) : of(false);
  }


  getUserPhoto(userId: string): Observable<MessageResponse<UserPhotoInfo>> {
    const params = { userId };
    return this.httpRequest<MessageResponse<UserPhotoInfo>>(this.serviceUrl, 'retrieveUserPhoto', true, params);
  }

  getUserAddresses(): Observable<AddressInfo[]> {
    const methodName = 'retrieveUserAddressList';
    return this.getUser().pipe(
      switchMap(({ id }) =>
        this.httpRequest<MessageResponse<AddressInfoList>>(this.serviceUrl, methodName, true, {
          userId: id,
          addressId: '',
        }),
      ),
      map(({ response }) => {
        this._userAddresses = response.addresses;
        return response.addresses;
      }),
    );
  }

  requestDeposit(
    recipientName: string,
    recipientEmail: string,
    message: string,
    depositToAccountId: string,
    requestAmount: string,
  ) {
    const params = { recipientName, recipientEmail, message, depositToAccountId, requestAmount };

    return this.httpRequest(this.serviceUrl, 'requestDeposit', true, params);
  }

  getPhotoListByUserId(userId: string): Observable<MessageResponse<UserPhotoList>> {
    const params = { userId };

    return this.httpRequest<MessageResponse<UserPhotoList>>(this.serviceUrl, 'retrieveUserPhotoList', true, params);
  }

  getPhotoById(photoId: string): Observable<MessageResponse<UserPhotoInfo>> {
    const params = { photoId };

    return this.httpRequest<MessageResponse<UserPhotoInfo>>(this.serviceUrl, 'retrieveUserPhoto', true, params);
  }

  private getPhotoIdByStatus(photoList: UserPhotoInfo[], status: number = 1): UserPhotoInfo | undefined {
    return photoList.find((photo: UserPhotoInfo) => photo.status === status);
  }
}
