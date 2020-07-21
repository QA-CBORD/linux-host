import { Injectable } from '@angular/core';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { UserPhotoUploadSettings } from '@core/model/user/user-photo-upload-settings.model';
import { BehaviorSubject, Observable, of, zip } from 'rxjs';
import { UserPhotoInfo } from '@core/model/user';
import { Settings } from '../../../app.global';
import SettingList = Settings.SettingList;
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { switchMap } from 'rxjs/operators';
import { SettingInfoList } from '@core/model/configuration/setting-info-list.model';

@Injectable({
  providedIn: 'root',
})
export class PhotoUploadService {
  private readonly emptyPhotoInfo: UserPhotoInfo;
  private readonly _govtIdFront$: BehaviorSubject<UserPhotoInfo> = new BehaviorSubject<UserPhotoInfo>(
    this.emptyPhotoInfo
  );
  private readonly _govtIdBack$: BehaviorSubject<UserPhotoInfo> = new BehaviorSubject<UserPhotoInfo>(
    this.emptyPhotoInfo
  );
  private readonly _profileImage$: BehaviorSubject<UserPhotoInfo> = new BehaviorSubject<UserPhotoInfo>(
    this.emptyPhotoInfo
  );
  private readonly _pendingProfileImage$: BehaviorSubject<UserPhotoInfo> = new BehaviorSubject<UserPhotoInfo>(
    this.emptyPhotoInfo
  );

  private userPhotoUploadSettings: UserPhotoUploadSettings;

  constructor(
    private readonly settingsFacadeService: SettingsFacadeService,
    private readonly userFacadeService: UserFacadeService
  ) {}

  get govtIdFront$(): Observable<UserPhotoInfo> {
    return this._govtIdFront$.asObservable();
  }

  get govtIdBack$(): Observable<UserPhotoInfo> {
    return this._govtIdBack$.asObservable();
  }

  get profileImage$(): Observable<UserPhotoInfo> {
    return this._profileImage$.asObservable();
  }

  get pendingProfileImage$(): Observable<UserPhotoInfo> {
    return this._pendingProfileImage$.asObservable();
  }

  private set _govtImageFront(value: UserPhotoInfo) {
    this._govtIdFront$.next(value);
  }

  private set _govtImageBack(value: UserPhotoInfo) {
    this._govtIdBack$.next(value);
  }

  private set _profileImage(value: UserPhotoInfo) {
    this._profileImage$.next(value);
  }

  private set _pendingProfileImage(value: UserPhotoInfo) {
    this._pendingProfileImage$.next(value);
  }

  getInitialPhotoData$() {
    zip(this.settingsFacadeService.fetchSettingList(SettingList.PHOTO_UPLOAD), this.userFacadeService.getPhotoList()).pipe(switchMap(([settings, photoInfoList]) =>{
      this.populatePhotoUploadSettings(settings);
      return of(true);
      }
    ))
  }


  private populatePhotoUploadSettings(settingsList: SettingInfoList){
    console.log('PU Service - pupPhotoUpload start');
    Object.keys(this.userPhotoUploadSettings).forEach((prop) => {
      if(settingsList.map.has(prop)){
        this.userPhotoUploadSettings[prop] = settingsList.map.get(prop);
      }
    });
    console.log('PU Service - pupPhotoUpload', this.userPhotoUploadSettings);
  }



}
