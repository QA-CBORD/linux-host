import { Injectable } from '@angular/core';

import { map, switchMap } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { BaseService } from '../base-service/base.service';
import { UserInfo } from 'src/app/core/model/user/user-info.model';
import { UserPhotoInfo } from '../../model/user';
import { MessageResponse } from '../../model/service/message-response.model';
import { UserSettings } from '../../model/user';
import { UserPhotoList } from '../../model/user';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService {
  private readonly serviceUrl = '/json/user';
  private readonly userData$: BehaviorSubject<UserInfo> = new BehaviorSubject<UserInfo>(null);
  private userPhoto: UserPhotoInfo = null;

  private set _userData(userInfo: UserInfo) {
    this.userData$.next({ ...userInfo });
  }

  get userData(): Observable<UserInfo> {
    return this.userData$.asObservable();
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

  getAcceptedPhoto(): Observable<UserPhotoInfo> {
    if (this.userPhoto) return of(this.userPhoto);

    return this.getUser().pipe(
      switchMap(({ id }: UserInfo) => this.getUserPhoto(id)),
      map(({ response }) => (this.userPhoto = response))
    );
  }

  getUserPhoto(userId: string): Observable<MessageResponse<UserPhotoInfo>>{
    const params = { userId };
    return this.httpRequest<MessageResponse<UserPhotoInfo>>(this.serviceUrl, 'retrieveUserPhoto', true, params);
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
