import * as Globals from '../../../app.global';
import { InstitutionInfo } from '../institution/institution-info.model';
import { SettingInfo } from '../configuration/setting-info.model';
import { SettingInfoList } from '../configuration/setting-info-list.model';
import { ContentStringInfo } from '../content/content-string-info.model';
import { StartupInfo } from '../institution/native-startup-info.model';
import { EnvironmentInfo } from '../environment/environment-info.model';
import { UserInfo } from '../user/user-info.model';
import { UserPhotoInfo } from '../user/user-photo-info.model';
import { UserSettingInfo } from '../user/user-setting-info.model';
import { X_Y_REGEXP } from '@core/utils/regexp-patterns';

export class MCache {
  applicationUUID: string;
  localSessionTimestamp: Date;
  environmentInfo: EnvironmentInfo;
  appVersion: string;

  sessionId: string;
  startupInfo: StartupInfo;
  institutionInfo: InstitutionInfo = new InstitutionInfo();
  institutionSettings: SettingInfo[] = new Array<SettingInfo>();
  institutionStrings: ContentStringInfo[] = new Array<ContentStringInfo>();

  bIsPINSet = false;

  userInfo: UserInfo | any = {};
  userMediaValue: string;
  userPhotoInfo: UserPhotoInfo;
  userSettings: UserSettingInfo[] = new Array<UserSettingInfo>();

  static fromT(o: MCache) {
    const t: MCache = new MCache();
    t.applicationUUID = o.applicationUUID;
    t.localSessionTimestamp = o.localSessionTimestamp;
    t.environmentInfo = o.environmentInfo;
    t.appVersion = o.appVersion;
    t.sessionId = o.sessionId;
    t.startupInfo = o.startupInfo;
    t.institutionInfo = o.institutionInfo;
    t.institutionSettings = o.institutionSettings;
    t.institutionStrings = o.institutionStrings;
    t.bIsPINSet = o.bIsPINSet;
    return t;
  }

  getApplicationUUID(): string {
    if (this.applicationUUID != null) {
      return this.applicationUUID;
    } else {
      this.generateUUID();
      return this.applicationUUID;
    }
  }

  private generateUUID() {
    this.applicationUUID = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(X_Y_REGEXP, function(c) {
      // eslint-disable-next-line no-bitwise
      const r = (Math.random() * 16) | 0,
        v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  addSetting(newSetting: SettingInfo) {
    if (newSetting == null || newSetting.name == null) {
      return;
    }
    const eI: number = this.institutionSettings.indexOf(newSetting);
    if (eI > -1) {
      this.institutionSettings[eI] = newSetting;
    } else {
      this.institutionSettings.push(newSetting);
    }
  }

  addSettingList(newSettingList: SettingInfoList) {
    if (newSettingList == null || newSettingList.list == null || newSettingList.list.length <= 0) {
      return;
    }
    for (const setting of newSettingList.list) {
      if (setting == null || setting.name == null) {
        return;
      }
      const eI: number = this.institutionSettings.indexOf(setting);
      if (eI > -1) {
        this.institutionSettings[eI] = setting;
      } else {
        this.institutionSettings.push(setting);
      }
    }
  }

  getSetting(settingName: Globals.Settings.Setting): SettingInfo {
    for (const setting of this.institutionSettings) {
      if (this.getSettingName(setting) === settingName.toString()) {
        return setting;
      }
    }
    return null;
  }

  addContentString(newString: ContentStringInfo) {
    if (newString == null || newString.name == null) {
      return;
    }
    const eI: number = this.institutionStrings.indexOf(newString);
    if (eI > -1) {
      this.institutionStrings[eI] = newString;
    } else {
      this.institutionStrings.push(newString);
    }
  }

  addUserSetting(newSetting: UserSettingInfo) {
    if (newSetting == null || newSetting.name == null) {
      return;
    }
    const eI: number = this.userSettings.indexOf(newSetting);
    if (eI > -1) {
      this.userSettings[eI] = newSetting;
    } else {
      this.userSettings.push(newSetting);
    }
  }

  getUserSetting(settingName: Globals.User.Settings): UserSettingInfo {
    for (const setting of this.userSettings) {
      if (setting.name === settingName.toString()) {
        return setting;
      }
    }
    return null;
  }

  private getSettingName(setting: SettingInfo): string {
    return setting.domain + '.' + setting.category + '.' + setting.name;
  }

  private getStringName(string: ContentStringInfo): string {
    return string.domain + '.' + string.category + '.' + string.name;
  }
}
