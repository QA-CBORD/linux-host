export interface SettingsSectionConfig {
  label: string;
  items: SettingItemConfig[];
}

export interface SettingItemConfig {
  id: string;
  label: string;
  type: string;
  icon: string;
  navigate?: string;
  checked?: boolean;   
}
