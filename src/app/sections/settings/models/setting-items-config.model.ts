export interface SettingsSectionConfig {
  label: string;
  items: SettingItemConfig[];
}

export interface SettingItemConfig {
  label: string;
  type: string;
  icon: string;
  callback?: () => void;
}
