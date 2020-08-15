import { Settings } from 'src/app/app.global';

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
  checked?: boolean;   
  validations?: SettingItemValidation[] 
}

export interface SettingItemValidation {
  type: SETTINGS_VALIDATIONS | string;
  value: Settings.Setting | string;
}

export enum SETTINGS_VALIDATIONS {
  SettingEnable = 'setting-enable',
  Biometric = 'biometric'
}