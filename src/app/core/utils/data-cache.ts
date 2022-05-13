import { Injectable } from '@angular/core';

import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AppVersion } from '@ionic-native/app-version/ngx';

import { Observable, Observer } from 'rxjs';
import { async } from 'rxjs/internal/scheduler/async';
import { queue } from 'rxjs/internal/scheduler/queue';

import * as Globals from '../../../app/app.global';
import { MCache } from '../model/cache/MCache';
import { UserSettingInfo } from '../model/user';
import { UserPhotoInfo } from '../model/user';
import { UserInfo } from '../model/user';
import { ContentStringInfo } from '../model/content/content-string-info.model';
import { SettingInfoList } from '../model/configuration/setting-info-list.model';
import { SettingInfo } from '../model/configuration/setting-info.model';
import { StartupInfo } from '../model/institution/native-startup-info.model';
import { InstitutionInfo } from '../model/institution/institution-info.model';
import { EnvironmentInfo } from '../model/environment/environment-info.model';
import { take } from 'rxjs/operators';
import { PATRON_NAVIGATION } from '../../../app/app.global';

@Injectable()
export class DataCache {
  private static localCache: MCache = new MCache();
  private static destinationPage: PATRON_NAVIGATION;
  private static urlSession: string;

  private readonly TTL_MINUTES: number = 15;

  private readonly CACHE: string = 'cache';

  constructor(private platform: Platform, private appV: AppVersion, private storage: Storage) {
    /// is on mobile? cordova not available on website
    this.platform.ready().then(() => {
      if (this.platform.is('cordova')) {
        this.appV.getVersionNumber().then(vNum => DataCache.setAppVersion(vNum));
      }
    });
  }

  static setWebInitiValues(urlSesh: string = null, dPage: PATRON_NAVIGATION) {
    DataCache.destinationPage = dPage;
    DataCache.urlSession = urlSesh;
  }

  static getDestinationPage(): PATRON_NAVIGATION {
    return DataCache.destinationPage || null;
  }

  static getUrlSession(): string {
    return DataCache.urlSession || null;
  }

  static getApplicationUUID(): string {
    return DataCache.localCache.getApplicationUUID();
  }

  static getEnvironmentInfo(): EnvironmentInfo {
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

  static setUserInfo(newUserInfo: UserInfo) {
    DataCache.localCache.userInfo = newUserInfo;
  }

  static getUserInfo(): UserInfo {
    return DataCache.localCache.userInfo || null;
  }

  static getInstitutionId(): string {
    return DataCache.localCache.institutionInfo.id || null;
  }

  static setInstitutionId(institutionId: string) {
    DataCache.localCache.institutionInfo.id = institutionId;
  }

  refreshCacheFromStorage(onSuccess: () => void, onFailure: () => void) {
    this.getData(this.CACHE)
      .pipe(take(1))
      .subscribe(
        (data: string) => {
          if (data != null) {
            DataCache.localCache = MCache.fromT(JSON.parse(data));
            onSuccess();
          } else {
            onFailure();
          }
        },
        () => {
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

  setEnvironmentInfo(envInfo: EnvironmentInfo) {
    DataCache.localCache.environmentInfo = envInfo;
  }

  getEnvironmentInfo(): EnvironmentInfo {
    return DataCache.localCache.environmentInfo || null;
  }

  setSessionId(sessionId: string) {
    DataCache.localCache.sessionId = sessionId;
  }

  getSessionId(): string {
    return DataCache.localCache.sessionId || null;
  }

  getInstitutionInfo(): InstitutionInfo {
    return DataCache.localCache.institutionInfo || null;
  }

  setInstitutionInfo(institutionInfo: InstitutionInfo) {
    DataCache.localCache.institutionInfo = institutionInfo;
  }

  setStartupInfo(startupInfo: StartupInfo) {
    DataCache.localCache.startupInfo = startupInfo;
  }

  getStartupInfo(): StartupInfo {
    return DataCache.localCache.startupInfo || null;
  }

  setInstitutionSetting(settingInfo: SettingInfo) {
    DataCache.localCache.addSetting(settingInfo);
  }

  getInstitutionSetting(setting: Globals.Settings.Setting) {
    return DataCache.localCache.getSetting(setting).value;
  }

  setInstitutionSettingList(settingList: SettingInfoList) {
    DataCache.localCache.addSettingList(settingList);
  }

  setInstitutionContentString(contentStringInfo: ContentStringInfo) {
    DataCache.localCache.addContentString(contentStringInfo);
  }

  getPINSet(): boolean {
    return DataCache.localCache.bIsPINSet;
  }

  setPINSet(pinSet: boolean) {
    DataCache.localCache.bIsPINSet = pinSet;
  }

  getUserInfo(): UserInfo {
    return DataCache.localCache.userInfo;
  }

  setUserInfo(userInfo: UserInfo) {
    DataCache.localCache.userInfo = userInfo;
  }

  getUserPhotoInfo(): UserPhotoInfo {
    return DataCache.localCache.userPhotoInfo;
  }

  setUserPhotoInfo(userPhotoInfo: UserPhotoInfo) {
    DataCache.localCache.userPhotoInfo = userPhotoInfo;
  }

  getUserMediaValue(): string {
    return DataCache.localCache.userMediaValue;
  }

  setUserMediaValue(userMediaValue: string) {
    DataCache.localCache.userMediaValue = userMediaValue;
  }

  getUserUserSetting<T>(userSetting: Globals.User.Settings): T {
    return DataCache.localCache.getUserSetting(userSetting).value || null;
  }

  setUserSetting(userSetting: UserSettingInfo) {
    DataCache.localCache.addUserSetting(userSetting);
  }

  /**
   *  Retrieve data from the local data cache
   */
  private getData<T>(key: string): Observable<T> {
    return Observable.create((observer: Observer<T>) => {
      this.storage
        .ready()
        .then(() => {
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
      .then(() => {
        this.storage
          .set(key, data)
          .catch(() => {return;});
      })
      .catch(() => {return;});
  }
}
