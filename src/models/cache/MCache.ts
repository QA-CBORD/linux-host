import * as Globals from "../../app/app.global";
import { MInstitutionInfo } from './../institution/institution-info.interface';
import { MSettingInfo } from '../configuration/setting-info.interface';
import { MSettingInfoList } from '../configuration/setting-info-list.interface';
import { MContentStringInfo } from "../content/content-string-info.interface";
import { MStartupInfo } from "../institution/native-startup-info.interface";
import { MEnvironmentInfo } from "../environment/environment-info.interface";
import { MUserInfo } from "../user/user-info.interface";
import { MUserPhotoInfo } from "../user/user-photo-info.interface";
import { MUserSettingInfo } from "../user/user-setting-info.interface";



export class MCache {

    applicationUUID: string;
    localSessionTimestamp: Date;
    environmentInfo: MEnvironmentInfo;
    appVersion: string;

    sessionId: string;
    startupInfo: MStartupInfo;
    institutionInfo: MInstitutionInfo = new MInstitutionInfo();
    institutionSettings: MSettingInfo[] = new Array<MSettingInfo>();
    institutionStrings: MContentStringInfo[] = new Array<MContentStringInfo>();

    bIsPINSet: boolean = false;

    userInfo: MUserInfo;
    userMediaValue: string;
    userPhotoInfo: MUserPhotoInfo;
    userSettings: MUserSettingInfo[] = new Array<MUserSettingInfo>();

    constructor(
    ) {

    }

    static fromT(o: MCache) {
        let t: MCache = new MCache();
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



    public getApplicationUUID(): string {
        if (this.applicationUUID != null) {
            return this.applicationUUID;
        } else {
            this.generateUUID();
            return this.applicationUUID;
        }
    }

    private generateUUID() {
        this.applicationUUID = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }


    public addSetting(newSetting: MSettingInfo) {
        if (newSetting == null || newSetting.name == null) {
            return;
        }
        let eI: number = this.institutionSettings.indexOf(newSetting);
        if (eI > -1) {
            this.institutionSettings[eI] = newSetting;
        } else {
            this.institutionSettings.push(newSetting);
        }

    }

    public addSettingList(newSettingList: MSettingInfoList) {
        if (newSettingList == null || newSettingList.list == null || newSettingList.list.length <= 0) {
            return;
        }
        for (let setting of newSettingList.list) {
            if (setting == null || setting.name == null) {
                return;
            }
            let eI: number = this.institutionSettings.indexOf(setting);
            if (eI > -1) {
                this.institutionSettings[eI] = setting;
            } else {
                this.institutionSettings.push(setting);
            }
        }
    }

    public getSetting(settingName: Globals.Settings.ESetting): MSettingInfo {
        for (let setting of this.institutionSettings) {

            if (this.getSettingName(setting) == settingName.toString()) {
                return setting;
            }
        }
        return null;
    }

    public addContentString(newString: MContentStringInfo) {
        if (newString == null || newString.name == null) {
            return;
        }
        let eI: number = this.institutionStrings.indexOf(newString);
        if (eI > -1) {
            this.institutionStrings[eI] = newString;
        } else {
            this.institutionStrings.push(newString);
        }
    }

    public getContentString(stringName: Globals.Settings.EStrings): MContentStringInfo {
        for (let string of this.institutionStrings) {

            if (this.getStringName(string) == stringName.toString()) {
                return string;
            }
        }
        return null;
    }

    public addUserSetting(newSetting: MUserSettingInfo) {
        if (newSetting == null || newSetting.name == null) {
            return;
        }
        let eI: number = this.userSettings.indexOf(newSetting);
        if (eI > -1) {
            this.userSettings[eI] = newSetting;
        } else {
            this.userSettings.push(newSetting);
        }

    }

    public getUserSetting(settingName: Globals.User.ESetting): MUserSettingInfo {
        for (let setting of this.userSettings) {

            if (setting.name == settingName.toString()) {
                return setting;
            }
        }
        return null;
    }

    private getSettingName(setting: MSettingInfo): string {
        return setting.domain + "." + setting.category + "." + setting.name;
    }

    private getStringName(string: MContentStringInfo): string {
        return string.domain + "." + string.category + "." + string.name;
    }

}