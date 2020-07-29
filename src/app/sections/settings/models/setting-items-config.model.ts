export interface SettingsSectionConfig {
  label: string;
  items: SettingItemConfig[];
}

export interface SettingItemConfig {
  id: string;
  label: string;
  type: string;
  icon: string;
  callback?: () => void;
}
