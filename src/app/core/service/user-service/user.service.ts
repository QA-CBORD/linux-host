import { Injectable } from '@angular/core';

import { map, switchMap, catchError } from 'rxjs/operators';
import { BehaviorSubject, Observable, of, from } from 'rxjs';

import { BaseService } from '../base-service/base.service';
import { UserInfo } from 'src/app/core/model/user/user-info.model';
import { UserPhotoInfo } from '../../model/user';
import { MessageResponse } from '../../model/service/message-response.model';
import { UserSettings } from '../../model/user';
import { UserPhotoList } from '../../model/user';
import { HttpClient } from '@angular/common/http';
import { AddressInfo, AddressInfoList } from './../../model/user/user-address.model';
import { NativeProvider, NativeData } from '@core/provider/native-provider/native.provider';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService {
  private readonly serviceUrl = '/json/user';
  private readonly userData$: BehaviorSubject<UserInfo> = new BehaviorSubject<UserInfo>(<UserInfo>{});
  private readonly userAddresses$: BehaviorSubject<AddressInfo[]> = new BehaviorSubject<AddressInfo[]>([]);
  private userPhoto: UserPhotoInfo = null;

  constructor(readonly http: HttpClient, private readonly nativeProvider: NativeProvider) {
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

  getUserSettingsBySettingName(settingName: string): Observable<MessageResponse<UserSettings>> {
    return this.httpRequest<MessageResponse<UserSettings>>(this.serviceUrl, 'retrieveSetting', true, { settingName });
  }

  saveUserSettingsBySettingName(settingName: string, settingValue: string): Observable<MessageResponse<boolean>> {
    return this.httpRequest<MessageResponse<boolean>>(this.serviceUrl, 'saveSetting', true, {
      settingName,
      settingValue,
    });
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
      map(({ response }) => (this.userPhoto = response))
    );

    if (this.nativeProvider.isAndroid()) {
      nativeProviderFunction = of(this.nativeProvider.getAndroidData(NativeData.USER_PHOTO)).pipe(
        map((data: any) => JSON.parse(data))
      );
    } else if (this.nativeProvider.isIos()) {
      nativeProviderFunction = from(this.nativeProvider.getIosData(NativeData.USER_PHOTO)).pipe(
        map((data: any) => JSON.parse(data))
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
      })
    );
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
        })
      ),
      map(({ response }) => {
        this._userAddresses = response.addresses;
        return response.addresses;
      })
    );
  }

  requestDeposit(
    recipientName: string,
    recipientEmail: string,
    message: string,
    depositToAccountId: string,
    requestAmount: string
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
