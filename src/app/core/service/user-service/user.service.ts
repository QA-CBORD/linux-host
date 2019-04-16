import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { BaseService } from '../base-service/base.service';

import { MUserInfo } from 'src/app/core/model/user/user-info.interface';
import { map, switchMap } from 'rxjs/operators';
import { MUserPhotoInfo } from '../../model/user/user-photo-info.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService {
  private serviceUrl = '/json/user';
  private userData$: BehaviorSubject<MUserInfo> = new BehaviorSubject<MUserInfo>(null);

  set _userData(userInfo: MUserInfo) {
    this.userData$.next({ ...userInfo });
  }

  get userData(): Observable<MUserInfo> {
    return this.userData$.asObservable();
  }

  /**
   * Get the current User information using the current Session Id
   */
  getUser(): Observable<MUserInfo> {
    return this.httpRequest(this.serviceUrl, 'retrieve', true).pipe(
      map(({ response }) => {
        this._userData = response;
        return response;
      })
    );
  }

  getUserSettingsBySettingName(settingName: string): Observable<any> {
    return this.httpRequest<any>(this.serviceUrl, 'retrieveSetting', true, { settingName });
  }

  saveUserSettingsBySettingName<T>(settingName: string, settingValue: T): Observable<any> {
    return this.httpRequest<any>(this.serviceUrl, 'saveSetting', true, { settingName, settingValue });
  }


  getAcceptedPhoto(): Observable<MUserPhotoInfo> {
    return this.getUser().pipe(
      switchMap(({ id }: MUserInfo) => this.getPhotoListByUserId(id)),
      map(({ response: { list } }) => this.getPhotoIdByStatus(list)),
      switchMap(({ id }: MUserPhotoInfo) => this.getPhotoById(id)),
      map(({ response }) => response)
    );
  }

  getPhotoListByUserId(userId: string): Observable<any> {
    const params = { userId };

    return this.httpRequest(this.serviceUrl, 'retrieveUserPhotoList', true, params);
  }

  getPhotoById(photoId: string): Observable<any> {
    const params = { photoId };

    return this.httpRequest(this.serviceUrl, 'retrieveUserPhoto', true, params);
  }

  private getPhotoIdByStatus(photoList: MUserPhotoInfo[], status: number = 1): MUserPhotoInfo | undefined {
    return photoList.find((photo: MUserPhotoInfo) => photo.status === status);
  }
}
