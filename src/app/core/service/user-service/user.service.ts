import { Injectable } from '@angular/core';

import { map, switchMap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

import { BaseService } from '../base-service/base.service';
import { MUserInfo } from 'src/app/core/model/user/user-info.interface';
import { MUserPhotoInfo } from '../../model/user/user-photo-info.interface';
import { MessageResponse } from '../../model/service/message-response.interface';
import { UserSettings } from '../../model/user/user-settings';
import { UserPhotoList } from '../../model/user/user-photo-list';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService {
  private readonly serviceUrl = '/json/user';
  private readonly userData$: BehaviorSubject<MUserInfo> = new BehaviorSubject<MUserInfo>(null);

  private set _userData(userInfo: MUserInfo) {
    this.userData$.next({ ...userInfo });
  }

  get userData(): Observable<MUserInfo> {
    return this.userData$.asObservable();
  }

  getUser(): Observable<MUserInfo> {
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

  getAcceptedPhoto(): Observable<MUserPhotoInfo> {
    return this.getUser().pipe(
      switchMap(({ id }: MUserInfo) => this.getPhotoListByUserId(id)),
      map(({ response: { list } }) => this.getPhotoIdByStatus(list)),
      switchMap(({ id }: MUserPhotoInfo) => this.getPhotoById(id)),
      map(({ response }) => response)
    );
  }

  getPhotoListByUserId(userId: string): Observable<MessageResponse<UserPhotoList>> {
    const params = { userId };

    return this.httpRequest<MessageResponse<UserPhotoList>>(this.serviceUrl, 'retrieveUserPhotoList', true, params);
  }

  getPhotoById(photoId: string): Observable<MessageResponse<MUserPhotoInfo>> {
    const params = { photoId };

    return this.httpRequest<MessageResponse<MUserPhotoInfo>>(this.serviceUrl, 'retrieveUserPhoto', true, params);
  }

  private getPhotoIdByStatus(photoList: MUserPhotoInfo[], status: number = 1): MUserPhotoInfo | undefined {
    return photoList.find((photo: MUserPhotoInfo) => photo.status === status);
  }
}
