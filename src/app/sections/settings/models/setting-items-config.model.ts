import { Settings } from 'src/app/app.global';
import { CONTENT_STINGS_DOMAINS, CONTENT_STINGS_CATEGORIES } from 'src/app/content-strings';
import { UserInfo, UserNotificationInfo } from '@core/model/user';

export interface SettingsSectionConfig {
  label: string;
  items: SettingItemConfig[];
  visible?: boolean;
}

export interface SettingItemConfig {
  id: string;
  label: string;
  type: string;
  icon: string;
  navigate?: string;
  navigateExternal?: SettingItemExternalResource;
  checked?: boolean;
  toggleLabel?: ToggleLabel;
  validations?: SettingItemValidation[];
  modalContent?: ModalContent;
  getToggleStatus?: (service: any) => Promise<boolean>;
}

export interface SettingItemValidation {
  type: SETTINGS_VALIDATIONS | string;
  value: Settings.Setting | string;
}
export interface SettingItemExternalResource {
  type: string;
  value: Settings.Setting | string;
}
export interface ToggleLabel {
  checked: string;
  unchecked: string;
}
export interface ModalContent {
  domain: CONTENT_STINGS_DOMAINS;
  category: CONTENT_STINGS_CATEGORIES;
  name: string;
  component: any;
}
export enum SETTINGS_VALIDATIONS {
  SettingEnable = 'setting-enable',
  Biometric = 'biometric',
}

export interface UserInfoSet extends UserInfo {
  userNotificationInfoList: UserNotificationInfo[];
}
