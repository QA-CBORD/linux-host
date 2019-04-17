import { Injectable } from '@angular/core';

import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AppVersion } from '@ionic-native/app-version/ngx';

import { Observable, Observer } from 'rxjs';
import { async } from 'rxjs/internal/scheduler/async';
import { queue } from 'rxjs/internal/scheduler/queue';

import * as Globals from '../../../app/app.global';
import { MCache } from '../model/cache/MCache';
import { MUserSettingInfo } from '../model/user/user-setting-info.interface';
import { MUserPhotoInfo } from '../model/user/user-photo-info.interface';
import { MUserInfo } from '../model/user/user-info.interface';
import { MContentStringInfo } from '../model/content/content-string-info.interface';
import { MSettingInfoList } from '../model/configuration/setting-info-list.interface';
import { MSettingInfo } from '../model/configuration/setting-info.interface';
import { MStartupInfo } from '../model/institution/native-startup-info.interface';
import { MInstitutionInfo } from '../model/institution/institution-info.interface';
import { MEnvironmentInfo } from '../model/environment/environment-info.interface';
import { EDestination } from 'src/app/pages/home/home.page';

@Injectable()
export class DataCache {
  private static localCache: MCache = new MCache();
  private static destinationPage: EDestination;
  private static urlSession: string;

  private readonly TTL_MINUTES: number = 15;

  private readonly CACHE: string = 'cache';

  constructor(private platform: Platform, private appV: AppVersion, private storage: Storage) {
    /// is on mobile? cordova not available on website
    this.platform.ready().then(_ => {
      if (this.platform.is('cordova')) {
        this.appV.getVersionNumber().then(vNum => DataCache.setAppVersion(vNum));
      }
    });
  }

  static setWebInitiValues(urlSesh: string, dPage: EDestination) {
    DataCache.destinationPage = dPage;
    DataCache.urlSession = urlSesh;
  }

  static getDestinationPage(): EDestination {
    return DataCache.destinationPage;
  }

  static getUrlSession(): string {
    return DataCache.urlSession;
  }

  static getApplicationUUID(): string {
    return DataCache.localCache.getApplicationUUID();
  }

  static getEnvironmentInfo(): MEnvironmentInfo {
    return DataCache.localCache.environmentInfo || null;
  }

  static setAppVersion(appVersion: string) {
    DataCache.localCache.appVersion = appVersion;
  }

  static getAppVersion(): string {
    return DataCache.localCache.appVersion || null;
  }

  static setSessionId(newSessionId: string) {
    DataCache.localCache.sessionId = newSessionId;
  }

  static getSessionId(): string {
    return DataCache.localCache.sessionId || null;
  }

  static setUserInfo(newUserInfo: MUserInfo) {
    DataCache.localCache.userInfo = newUserInfo;
  }

  static getUserInfo(): MUserInfo {
    return DataCache.localCache.userInfo || null;
  }

  static getInstitutionId(): string {
    return DataCache.localCache.institutionInfo.id || null;
  }

  static setInstitutionId(institutionId: string) {
    DataCache.localCache.institutionInfo.id = institutionId;
  }

  refreshCacheFromStorage(onSuccess: () => void, onFailure: () => void) {
    this.getData(this.CACHE).subscribe(
      (data: string) => {
        if (data != null) {
          DataCache.localCache = MCache.fromT(JSON.parse(data));
          onSuccess();
        } else {
          onFailure();
        }
      },
      error => {
        onFailure();
      }
    );
  }

  clearLocalCache() {
    this.storage.clear();
    DataCache.localCache = new MCache();
  }

  storeCache() {
    this.set(this.CACHE, JSON.stringify(DataCache.localCache));
  }

  setEnvironmentInfo(envInfo: MEnvironmentInfo) {
    DataCache.localCache.environmentInfo = envInfo;
  }

  getEnvironmentInfo(): MEnvironmentInfo {
    return DataCache.localCache.environmentInfo || null;
  }

  setSessionId(sessionId: string) {
    DataCache.localCache.sessionId = sessionId;
  }

  getSessionId(): string {
    return DataCache.localCache.sessionId || null;
  }

  getInstitutionInfo(): MInstitutionInfo {
    return DataCache.localCache.institutionInfo || null;
  }

  setInstitutionInfo(institutionInfo: MInstitutionInfo) {
    DataCache.localCache.institutionInfo = institutionInfo;
  }

  setStartupInfo(startupInfo: MStartupInfo) {
    DataCache.localCache.startupInfo = startupInfo;
  }

  getStartupInfo(): MStartupInfo {
    return DataCache.localCache.startupInfo || null;
  }

  setInstitutionSetting(settingInfo: MSettingInfo) {
    DataCache.localCache.addSetting(settingInfo);
  }

  getInstitutionSetting<T>(setting: Globals.Settings.ESetting): T {
    return DataCache.localCache.getSetting(setting).value;
  }

  setInstitutionSettingList(settingList: MSettingInfoList) {
    DataCache.localCache.addSettingList(settingList);
  }

  setInstitutionContentString(contentStringInfo: MContentStringInfo) {
    DataCache.localCache.addContentString(contentStringInfo);
  }

  getInstitutionContentString(string: Globals.Settings.EStrings): string {
    return DataCache.localCache.getContentString(string).value;
  }

  getPINSet(): boolean {
    return DataCache.localCache.bIsPINSet;
  }

  setPINSet(pinSet: boolean) {
    DataCache.localCache.bIsPINSet = pinSet;
  }

  getUserInfo(): MUserInfo {
    return DataCache.localCache.userInfo;
  }

  setUserInfo(userInfo: MUserInfo) {
    DataCache.localCache.userInfo = userInfo;
  }

  getUserPhotoInfo(): MUserPhotoInfo {
    return DataCache.localCache.userPhotoInfo;
  }

  setUserPhotoInfo(userPhotoInfo: MUserPhotoInfo) {
    DataCache.localCache.userPhotoInfo = userPhotoInfo;
  }

  getUserMediaValue(): string {
    return DataCache.localCache.userMediaValue;
  }

  setUserMediaValue(userMediaValue: string) {
    DataCache.localCache.userMediaValue = userMediaValue;
  }

  getUserUserSetting<T>(userSetting: Globals.User.ESetting): T {
    return DataCache.localCache.getUserSetting(userSetting).value || null;
  }

  setUserSetting(userSetting: MUserSettingInfo) {
    DataCache.localCache.addUserSetting(userSetting);
  }

  /**
   *  Retrieve data from the local data cache
   */
  private getData<T>(key: string): Observable<T> {
    return Observable.create((observer: Observer<T>) => {
      this.storage
        .ready()
        .then(value => {
          this.storage
            .get(key)
            .then(data => {
              observer.next(data);
              observer.complete();
            })
            .catch(error => {
              observer.error(error);
            });
        })
        .catch(error => {
          observer.error(error);
        });
    })
      .subscribeOn(async)
      .observeOn(queue) as Observable<T>;
  }

  /**
   * Set data in the data cache
   *
   * @param key Key for key/value data pair
   * @param data data to be stored
   */
  private set(key: string, data: any) {
    this.storage
      .ready()
      .then(val => {
        this.storage
          .set(key, data)
          .then(resp => {})
          .catch(error => {});
      })
      .catch(error => {});
  }
}
