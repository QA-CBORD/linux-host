import { SettingsSectionConfig } from './models/setting-items-config.model';

export enum LOCAL_ROUTING {
  photoUpload = 'photo-upload',
}

export enum SETTINGS_ID {
  personalData = 'email-pwd',
  password = 'pwd-change',
  faceId = 'face-id',
  pin = 'pin-change',
  devices = 'report-lost',
  address = 'my-address',
  deposits = 'auto-deposits',
  mealPlan = 'meal-plan-change',
  mealPurchase = 'meal-plan-purchase',
  theme = 'theme-change',
  home = 'home-edit',
  navigation = 'nav-edit',
  feedback = 'feedback-sending',
  help = 'help',
  support = 'email-support',
  terms = 'terms-privacy',
}
export const SETTINGS_CONFIG: SettingsSectionConfig[] = [
  {
    label: 'Account',
    items: [
      {
        id: SETTINGS_ID.personalData,
        icon: 'account-profile',
        label: 'Email & Phone Number',
        type: 'button',
      },
      { id: SETTINGS_ID.password, icon: 'key', label: 'Change password', type: 'button' },
      { id: SETTINGS_ID.faceId, icon: 'faceid', label: 'Face ID', type: 'toggle' },
      { id: SETTINGS_ID.pin, icon: 'pin-pad', label: 'Change / Remove PIN', type: 'button' },
      { id: SETTINGS_ID.devices, icon: 'devices', label: 'Report Device as Lost', type: 'button' },
      { id: SETTINGS_ID.address, icon: 'map-marker', label: 'Saved Address', type: 'button' },
    ],
  },
  {
    label: 'Payment',
    items: [{ id: SETTINGS_ID.deposits, icon: 'calendar', label: 'Automatic deposits', type: 'button' }],
  },
  {
    label: 'Meal Plans',
    items: [
      { id: SETTINGS_ID.mealPlan, icon: 'meal-change', label: 'Change meal plan', type: 'button' },
      { id: SETTINGS_ID.mealPurchase, icon: 'meal-purchase', label: 'Purchase meal plan', type: 'button' },
    ],
  },
  {
    label: 'Preferences',
    items: [
      { id: SETTINGS_ID.theme, icon: 'theme-dark-light-mode', label: 'Theme', type: 'button' },
      { id: SETTINGS_ID.home, icon: 'home-edit', label: 'Edit Home', type: 'button' },
      { id: SETTINGS_ID.navigation, icon: 'more-menu', label: 'Edit Navigation', type: 'button' },
    ],
  },
  {
    label: 'Feedback & Support',
    items: [
      { id: SETTINGS_ID.feedback, icon: 'none', label: 'Send app feedback', type: 'button' },
      { id: SETTINGS_ID.help, icon: 'help', label: 'Help', type: 'button' },
      { id: SETTINGS_ID.support, icon: 'mail', label: 'Email Support', type: 'button' },
      { id: SETTINGS_ID.terms, icon: 'none', label: 'Terms of Use & Privacy Policy', type: 'button' },
    ],
  },
];
