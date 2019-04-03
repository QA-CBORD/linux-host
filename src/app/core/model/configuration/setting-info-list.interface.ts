import { MSettingInfo } from './setting-info.interface';

export interface MSettingInfoList {
    list: Array<MSettingInfo>;
    map: Map<string, MSettingInfo>;
}
