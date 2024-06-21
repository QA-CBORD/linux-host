import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInfo } from '@core/model/user/user-info.model';
import { UserSettingInfo, UserPhotoInfo, UserPhotoList, AddressInfoList, UserNotificationInfo } from '@core/model/user';
import { map, switchMap } from 'rxjs/operators';
import { MessageResponse } from '@core/model/service/message-response.model';
import { AddressInfo } from '@core/model/address/address-info';
import { HttpClient } from '@angular/common/http';
import { RPCQueryConfig } from '@core/interceptors/query-config.model';
import { Settings } from '../../../app.global';
import { LookupFieldInfo } from '@core/model/institution/institution-lookup-field.model';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  private readonly serviceUrl = '/json/user';

  constructor(private readonly http: HttpClient) {}

  getUser(): Observable<UserInfo> {
    const queryConfig = new RPCQueryConfig('retrieve', { forceOverwrite: true }, true);

    return this.http
      .post<MessageResponse<UserInfo>>(this.serviceUrl, queryConfig)
      .pipe(map(({ response }) => response));
  }

  getUserSettings(settingName: Settings.Setting): Observable<UserSettingInfo> {
    const queryConfig = new RPCQueryConfig('retrieveSetting', { settingName: settingName.toString() }, true);

    return this.http
      .post<MessageResponse<UserSettingInfo>>(this.serviceUrl, queryConfig)
      .pipe(map(({ response }) => response));
  }

  saveUserSetting(settingName: Settings.Setting, settingValue: string): Observable<MessageResponse<boolean>> {
    const queryConfig = new RPCQueryConfig(
      'saveSetting',
      {
        settingName: settingName.toString(),
        settingValue,
      },
      true
    );

    return this.http.post<MessageResponse<boolean>>(this.serviceUrl, queryConfig);
  }

  //if you leave photoID null it will return you the accepted photo, if it exists
  getUserPhoto(photoId: string): Observable<MessageResponse<UserPhotoInfo>> {
    const queryConfig = new RPCQueryConfig('retrieveUserPhoto', { photoId }, true);

    return this.http.post<MessageResponse<UserPhotoInfo>>(this.serviceUrl, queryConfig);
  }

  // Boolean addUserPhoto(String sessionId, String userId, UserPhotoInfo photo)
  //setting front of ID photo with a type of 1 or 2 in the userPhotoInfo object
  addUserPhoto(userId: string, photo: UserPhotoInfo): Observable<MessageResponse<boolean>> {
    const queryConfig = new RPCQueryConfig('addUserPhoto', { userId, photo }, true);

    return this.http.post<MessageResponse<boolean>>(this.serviceUrl, queryConfig);
  }

  //used for deleting a photo right now, but just changes the status to 4
  updateUserPhotoStatus(photoId: string, status: number, reason: string) {
    const queryConfig = new RPCQueryConfig('updateUserPhotoStatus', { photoId, status, reason }, true);

    return this.http.post<MessageResponse<boolean>>(this.serviceUrl, queryConfig);
  }

  createUserPin(PIN: string, deviceId: string): Observable<MessageResponse<boolean>> {
    const queryConfig = new RPCQueryConfig('createPIN', { PIN, deviceId }, true, false);

    return this.http.post<MessageResponse<boolean>>(this.serviceUrl, queryConfig);
  }

  getUserAddresses(): Observable<AddressInfo[]> {
    const queryConfig = id => new RPCQueryConfig('retrieveUserAddressList', { userId: id, addressId: '' }, true);

    return this.getUser().pipe(
      switchMap(({ id }) => this.http.post<MessageResponse<AddressInfoList>>(this.serviceUrl, queryConfig(id))),
      map(({ response: { addresses } }) => addresses)
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
    const queryConfig = new RPCQueryConfig('requestDeposit', params, true);

    return this.http.post<MessageResponse<boolean>>(this.serviceUrl, queryConfig);
  }

  getPhotoListByUserId(userId: string): Observable<MessageResponse<UserPhotoList>> {
    const queryConfig = new RPCQueryConfig('retrieveUserPhotoList', { userId }, true);

    return this.http.post<MessageResponse<UserPhotoList>>(this.serviceUrl, queryConfig);
  }

  //this is potentially going to become the new call Matt is making not sure
  getFullPhotoListByUserId(userId: string): Observable<MessageResponse<UserPhotoList>> {
    const queryConfig = new RPCQueryConfig('retrieveFullUserPhotoList', { userId }, true);

    return this.http.post<MessageResponse<UserPhotoList>>(this.serviceUrl, queryConfig);
  }

  saveNotification$(userId: string, notification: UserNotificationInfo): Observable<string> {
    const params = { userId, notification, forceOverwrite: true };
    const queryConfig = new RPCQueryConfig('saveNotification', params, true, false);
    return this.http.post<string>(this.serviceUrl, queryConfig);
  }

  logoutAndRemoveUserNotification$(userId: string, notification: UserNotificationInfo): Observable<boolean> {
    const params = { userId, notification };
    const queryConfig = new RPCQueryConfig('logoutAndRemoveUserNotification', params, true, false);
    return this.http.post<boolean>(this.serviceUrl, queryConfig);
  }

  updateUserInfo$(user: UserInfo): Observable<string> {
    const params = { user, forceOverwrite: true };
    const queryConfig = new RPCQueryConfig('update', params, true, false);
    return this.http.post<string>(this.serviceUrl, queryConfig);
  }

  reportCard$(isReportAsLost: boolean): Observable<MessageResponse<string>> {
    const queryConfig = new RPCQueryConfig(isReportAsLost ? 'reportCardLost' : 'reportCardFound', {}, true, false);
    return this.http.post<MessageResponse<string>>(this.serviceUrl, queryConfig);
  }

  changePassword$(oldPassword: string, newPassword: string): Observable<boolean> {
    const params = { oldPassword, newPassword };
    const queryConfig = new RPCQueryConfig('changePassword', params, true, false);
    return this.http.post<boolean>(this.serviceUrl, queryConfig);
  }
  retrieveUserIdByCashlessFields(institutionId: string, sessionId: string, cashlessData: LookupFieldInfo[]) {
    const queryConfig = new RPCQueryConfig('retrieveUserIdByCashlessFields', {
      institutionId,
      sessionId,
      cashlessData: {
        lookupFields: cashlessData,
      },
    });
    return this.http.post<MessageResponse<string>>(this.serviceUrl, queryConfig).pipe(map(({ response }) => response));
  }
}
