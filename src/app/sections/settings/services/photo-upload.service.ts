import { Injectable } from '@angular/core';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { UserPhotoUploadSettings } from '@core/model/user/user-photo-upload-settings.model';
import { BehaviorSubject, from, iif, Observable, of, zip } from 'rxjs';
import { UserPhotoInfo, UserPhotoList } from '@core/model/user';
import { Settings } from '../../../app.global';
import SettingList = Settings.SettingList;
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { SettingInfoList } from '@core/model/configuration/setting-info-list.model';

export enum PhotoStatus {
  PENDING,
  ACCEPTED,
  REJECTED,
  REPLACED,
  DELETED,
}

export enum PhotoType {
  PROFILE,
  GOVT_ID_FRONT,
  GOVT_ID_BACK,
}

@Injectable({
  providedIn: 'root',
})
export class PhotoUploadService {
  private readonly _govtIdFront$: BehaviorSubject<UserPhotoInfo> = new BehaviorSubject<UserPhotoInfo>(null);
  private readonly _govtIdFrontPending$: BehaviorSubject<UserPhotoInfo> = new BehaviorSubject<UserPhotoInfo>(null);
  private readonly _govtIdBack$: BehaviorSubject<UserPhotoInfo> = new BehaviorSubject<UserPhotoInfo>(null);
  private readonly _govtIdBackPending$: BehaviorSubject<UserPhotoInfo> = new BehaviorSubject<UserPhotoInfo>(null);
  private readonly _profileImage$: BehaviorSubject<UserPhotoInfo> = new BehaviorSubject<UserPhotoInfo>(null);
  private readonly _profileImagePending$: BehaviorSubject<UserPhotoInfo> = new BehaviorSubject<UserPhotoInfo>(null);

  private userPhotoUploadSettings: UserPhotoUploadSettings = {
    cacheTimeoutMinutes: null,
    displayHeight: null,
    displayWidth: null,
    maxUploadSize: null,
    saveHeight: null,
    saveWidth: null,
  };

  constructor(
    private readonly settingsFacadeService: SettingsFacadeService,
    private readonly userFacadeService: UserFacadeService
  ) {}

  get govtIdFront$(): Observable<UserPhotoInfo> {
    return this._govtIdFront$.asObservable();
  }

  get govtIdFrontPending$(): Observable<UserPhotoInfo> {
    return this._govtIdFrontPending$.asObservable();
  }

  get govtIdBack$(): Observable<UserPhotoInfo> {
    return this._govtIdBack$.asObservable();
  }

  get govtIdBackPending$(): Observable<UserPhotoInfo> {
    return this._govtIdBackPending$.asObservable();
  }

  get profileImage$(): Observable<UserPhotoInfo> {
    return this._profileImage$.asObservable();
  }

  get profileImagePending$(): Observable<UserPhotoInfo> {
    return this._profileImagePending$.asObservable();
  }

  private set _govtIdFront(value: UserPhotoInfo) {
    this._govtIdFront$.next(value);
  }

  private set _govtIdFrontPending(value: UserPhotoInfo) {
    this._govtIdFrontPending$.next(value);
  }

  private set _govtIdBack(value: UserPhotoInfo) {
    this._govtIdBack$.next(value);
  }

  private set _govtIdBackPending(value: UserPhotoInfo) {
    this._govtIdBackPending$.next(value);
  }

  private set _profileImage(value: UserPhotoInfo) {
    this._profileImage$.next(value);
  }

  private set _profileImagePending(value: UserPhotoInfo) {
    this._profileImagePending$.next(value);
  }

  /// get photo upload settings and fetch and handle photos
  getInitialPhotoData$(): Observable<UserPhotoInfo[]> {
    return zip(
      this.settingsFacadeService.fetchSettingList(SettingList.PHOTO_UPLOAD),
      this.userFacadeService.getPhotoList()
    ).pipe(
      switchMap(([settings, photoInfoList]) => {
        /// populate upload settings if they exist
        this.populatePhotoUploadSettings(settings);
        return iif(() => photoInfoList && !photoInfoList.empty, this.fetchUserPhotosInList(photoInfoList), of([]));
      })
    );
  }

  /// get photo data by status Accepted and Pending and fetch array of photos
  private fetchUserPhotosInList(photoList: UserPhotoList): Observable<UserPhotoInfo[]> {
    return of(
      photoList.list.filter(({ status }) => status === PhotoStatus.ACCEPTED || status == PhotoStatus.PENDING)
    ).pipe(switchMap(photoList => zip(...photoList.map(({ id }) => this.handleUserPhotoById(id)))));
  }

  /// fetch photo by id and set the data here if it exists
  handleUserPhotoById(photoId: string): Observable<UserPhotoInfo> {
    return this.userFacadeService.getPhotoById(photoId).pipe(tap(photoInfo => this.setPhotoInfo(photoInfo)));
  }

  private setPhotoInfo(photoInfo: UserPhotoInfo) {
    switch (photoInfo.type) {
      case PhotoType.PROFILE:
        if (photoInfo.status === PhotoStatus.ACCEPTED) {
          this._profileImage = photoInfo;
        } else if (photoInfo.status === PhotoStatus.PENDING) {
          this._profileImagePending = photoInfo;
        }
        break;
      case PhotoType.GOVT_ID_FRONT:
        if (photoInfo.status === PhotoStatus.ACCEPTED) {
          this._govtIdFront = photoInfo;
        } else if (photoInfo.status === PhotoStatus.PENDING) {
          this._govtIdFrontPending = photoInfo;
        }
        break;
      case PhotoType.GOVT_ID_BACK:
        if (photoInfo.status === PhotoStatus.ACCEPTED) {
          this._govtIdBack = photoInfo;
        } else if (photoInfo.status === PhotoStatus.PENDING) {
          this._govtIdBackPending = photoInfo;
        }
        break;
    }
  }

  /// populate photo upload settings from settings list
  private populatePhotoUploadSettings(settingsList: SettingInfoList) {
    /// return if no settings data
    if (!settingsList || !settingsList.list) {
      return;
    }
    /// reduce array of settingInfo into HashMap of key-value pairs
    const tempList = settingsList.list.reduce((map, { name, value }) => {
      map[name.split('_').join('')] = value;
      return map;
    }, {});

    /// assign setting values to the object property
    Object.keys(this.userPhotoUploadSettings).forEach(prop => {
      if (tempList[prop.toLowerCase()]) {
        this.userPhotoUploadSettings[prop] = tempList[prop.toLowerCase()];
      }
    });
  }
}
