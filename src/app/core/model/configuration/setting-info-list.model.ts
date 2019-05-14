import { SettingInfo } from './setting-info.model';

export interface SettingInfoList {
    list: Array<SettingInfo>;
    map: Map<string, SettingInfo>;
}
