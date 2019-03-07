import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import * as Globals from '../../app/app.global';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { async } from 'rxjs/scheduler/async';
import { queue } from 'rxjs/scheduler/queue';

import { AppVersion } from '@ionic-native/app-version/ngx';

import { MCache } from '../../models/cache/MCache';
import { MInstitutionInfo } from '../../models/institution/institution-info.interface';
import { MSettingInfoList } from '../../models/configuration/setting-info-list.interface';
import { MSettingInfo } from '../../models/configuration/setting-info.interface';
import { MContentStringInfo } from './../../models/content/content-string-info.interface';
import { MStartupInfo } from '../../models/institution/native-startup-info.interface';
import { MEnvironmentInfo } from '../../models/environment/environment-info.interface';
import { MUserInfo } from '../../models/user/user-info.interface';
import { MUserPhotoInfo } from '../../models/user/user-photo-info.interface';
import { MUserSettingInfo } from '../../models/user/user-setting-info.interface';


@Injectable()
export class DataCache {

  private static localCache: MCache = new MCache();

  private readonly TTL_MINUTES: number = 15;

  private readonly CACHE: string = "cache";

  constructor(
    private platform: Platform,
    private appV: AppVersion,
    private storage: Storage
  ) {

    /// is on mobile? cordova not available on website
    platform.ready().then(_ => {
      if (platform.is('cordova')) {
        appV.getVersionNumber().then(vNum => DataCache.setAppVersion(vNum));
      }
    });


  }

  public refreshCacheFromStorage(onSuccess: () => void, onFailure: () => void) {
    this.getData(this.CACHE).subscribe(
      (data: string) => {
        if (data != null) {
          DataCache.localCache = MCache.fromT(JSON.parse(data));
          onSuccess();
        } else {
          onFailure();
        }
      },
      (error) => {
        onFailure();
      }
    )
  }

  public clearLocalCache() {
    this.storage.clear().then(_ => { });
    DataCache.localCache = new MCache();
  }

  public storeCache() {
    this.set(this.CACHE, JSON.stringify(DataCache.localCache));
  }

  public static getApplicationUUID(): string {
    return DataCache.localCache.getApplicationUUID();
  }

  public setEnvironmentInfo(envInfo: MEnvironmentInfo) {
    DataCache.localCache.environmentInfo = envInfo;
  }

  public getEnvironmentInfo(): MEnvironmentInfo {
    return DataCache.localCache.environmentInfo || null;
  }

  public static getEnvironmentInfo(): MEnvironmentInfo {
    return DataCache.localCache.environmentInfo || null;
  }

  public static setAppVersion(appVersion: string) {
    DataCache.localCache.appVersion = appVersion;
  }

  public static getAppVersion(): string {
    return DataCache.localCache.appVersion || null;
  }

  public setSessionId(sessionId: string) {
    DataCache.localCache.sessionId = sessionId;
  }

  public static getSessionId(): string {
    return DataCache.localCache.sessionId || null;
  }

  public getSessionId(): string {
    return DataCache.localCache.sessionId || null;
  }

  public getInstitutionId(): string {
    return DataCache.localCache.institutionInfo.id || null;
  }

  public static getInstitutionId(): string {
    return DataCache.localCache.institutionInfo.id || null;
  }

  public setInstitutionId(institutionId: string) {
    DataCache.localCache.institutionInfo.id = institutionId;
  }

  public getInstitutionInfo(): MInstitutionInfo {
    return DataCache.localCache.institutionInfo || null;
  }

  public setInstitutionInfo(institutionInfo: MInstitutionInfo) {
    DataCache.localCache.institutionInfo = institutionInfo;
  }

  public setStartupInfo(startupInfo: MStartupInfo) {
    DataCache.localCache.startupInfo = startupInfo;
  }

  public getStartupInfo(): MStartupInfo {
    return DataCache.localCache.startupInfo || null;
  }

  public setInstitutionSetting(settingInfo: MSettingInfo) {
    DataCache.localCache.addSetting(settingInfo);
  }

  public getInstitutionSetting<T>(setting: Globals.Settings.ESetting): T {
    return DataCache.localCache.getSetting(setting).value;
  }

  public setInstitutionSettingList(settingList: MSettingInfoList) {
    DataCache.localCache.addSettingList(settingList);
  }

  public setInstitutionContentString(contentStringInfo: MContentStringInfo) {
    DataCache.localCache.addContentString(contentStringInfo);
  }

  public getInstitutionContentString(string: Globals.Settings.EStrings): string {
    return DataCache.localCache.getContentString(string).value;
  }

  public getPINSet(): boolean {
    return DataCache.localCache.bIsPINSet;
  }

  public setPINSet(pinSet: boolean) {
    DataCache.localCache.bIsPINSet = pinSet;
  }

  public getUserInfo(): MUserInfo {
    return DataCache.localCache.userInfo;
  }

  public setUserInfo(userInfo: MUserInfo) {
    DataCache.localCache.userInfo = userInfo;
  }

  public getUserPhotoInfo(): MUserPhotoInfo {
    return DataCache.localCache.userPhotoInfo;
  }

  public setUserPhotoInfo(userPhotoInfo: MUserPhotoInfo) {
    DataCache.localCache.userPhotoInfo = userPhotoInfo;
  }

  public getUserMediaValue(): string {
    return DataCache.localCache.userMediaValue;
  }

  public setUserMediaValue(userMediaValue: string) {
    DataCache.localCache.userMediaValue = userMediaValue;
  }

  public getUserUserSetting<T>(userSetting: Globals.User.ESetting): T {
    return DataCache.localCache.getUserSetting(userSetting).value || null;
  }

  public setUserSetting(userSetting: MUserSettingInfo) {
    DataCache.localCache.addUserSetting(userSetting);
  }


  /**
   *  Retrieve data from the local data cache
   */
  private getData<T>(key: string): Observable<T> {
    return (Observable.create((observer: Observer<T>) => {
      this.storage.ready()
        .then((value) => {
          this.storage.get(key)
            .then((data) => {
              observer.next(data);
              observer.complete();
            })
            .catch((error) => {
              console.log(`GET ERROR ${key} - ${error}`);
              observer.error(error);
            });
        })
        .catch((error) => {
          console.log(`GET STORAGE ERROR ${key} - ${error}`);
          observer.error(error);
        });

    })
      .subscribeOn(async)
      .observeOn(queue)) as Observable<T>;
  }

  /**
   * Set data in the data cache
   * 
   * @param key Key for key/value data pair
   * @param data data to be stored
   */
  private set(key: string, data: any) {
    this.storage.ready()
      .then(val => {
        this.storage.set(key, data)
          .then((resp) => {
          })
          .catch((error) => {
            console.log(`SET ERROR ${key} - ${error}`);
          });
      })
      .catch((error) => {
        console.log(`SET STORAGE ERROR ${key} - ${error}`);
      });
  }


}
