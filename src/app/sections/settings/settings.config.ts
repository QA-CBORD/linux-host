import { SettingsSectionConfig } from './models/setting-items-config.model';

export enum LOCAL_ROUTING {
  photoUpload = 'photo-upload',
}

export const SETTINGS_CONFIG: SettingsSectionConfig[] = [
  {
    label: 'Account',
    items: [
      { icon: 'account-profile', label: 'Email & Phone Number', type: 'button' },
      { icon: 'key', label: 'Change password', type: 'button' },
      { icon: 'faceid', label: 'Face ID', type: 'toggle' },
      { icon: 'pin-pad', label: 'Change / Remove PIN', type: 'button' },
      { icon: 'devices', label: 'Report Device as Lost', type: 'button' },
      { icon: 'map-marker', label: 'Saved Address', type: 'button' },
    ],
  },
  {
    label: 'Payment',
    items: [{ icon: 'calendar', label: 'Automatic deposits', type: 'button' }],
  },
  {
    label: 'Meal Plans',
    items: [
      { icon: 'meal-change', label: 'Change meal plan', type: 'button' },
      { icon: 'meal-purchase', label: 'Purchase meal plan', type: 'button' },
    ],
  },
  {
    label: 'Preferences',
    items: [
      { icon: 'theme-dark-light-mode', label: 'Theme', type: 'button' },
      { icon: 'home-edit', label: 'Edit Home', type: 'button' },
      { icon: 'more-menu', label: 'Edit Navigation', type: 'button' },
    ],
  },
  {
    label: 'Feedback & Support',
    items: [
      { icon: 'none', label: 'Send app feedback', type: 'button' },
      { icon: 'help', label: 'Help', type: 'button' },
      { icon: 'mail', label: 'Email Support', type: 'button' },
      { icon: 'none', label: 'Terms of Use & Privacy Policy', type: 'button' },
    ],
  },
];
