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
  settingKey?: Settings.Setting;
  navigate?: string;
  checked?: boolean;   
  visible?: boolean;   
}
