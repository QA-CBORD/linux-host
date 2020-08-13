import { SettingsSectionConfig } from './models/setting-items-config.model';
import { Settings } from 'src/app/app.global';

export enum LOCAL_ROUTING {
  photoUpload = 'photo-upload',
}
export enum SETTINGS_NAVIGATE {
  personalData = 'email-pwd',
  updatePhoto = 'photo-upload',
  lostCard = 'lost-card',
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
  navigate = 'nav-edit',
  feedback = 'feedback-sending',
  help = 'help',
  support = 'email-support',
  terms = 'terms-privacy',
}

export enum SETTINGS_ID {
  updatePhoto = 'update-photo',
  lostCard = 'lost-card',
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
  navigate = 'nav-edit',
  feedback = 'feedback-sending',
  help = 'help',
  support = 'email-support',
  terms = 'terms-privacy',
}
export const SETTINGS_CONFIG: SettingsSectionConfig[] = [
  {
    label: 'Your card',
    items: [
      {
        id: SETTINGS_ID.personalData,
        icon: 'update-photo',
        label: 'Update photo',
        type: 'button',
        navigate: SETTINGS_NAVIGATE.personalData,
      },
      {
        id: SETTINGS_ID.password,
        icon: 'card-lost',
        label: 'Report card as lost',
        type: 'button',
        navigate: SETTINGS_NAVIGATE.lostCard,
        settingKey: Settings.Setting.MEAL_DONATIONS_ENABLED,
      },
    ],
  },
  {
    label: 'Account',
    items: [
      {
        id: SETTINGS_ID.personalData,
        icon: 'account-profile',
        label: 'Email & Phone Number',
        type: 'button',
        navigate: SETTINGS_NAVIGATE.personalData,
      },
      {
        id: SETTINGS_ID.password,
        icon: 'key',
        label: 'Change password',
        type: 'button',
        navigate: SETTINGS_NAVIGATE.password,
      },
      { id: SETTINGS_ID.faceId, icon: 'faceid', label: 'Face ID', type: 'toggle' },
      {
        id: SETTINGS_ID.pin,
        icon: 'pin-pad',
        label: 'Change / Remove PIN',
        type: 'button',
        navigate: SETTINGS_NAVIGATE.pin,
        settingKey: Settings.Setting.MEAL_DONATIONS_ENABLED,
      },
      {
        id: SETTINGS_ID.devices,
        icon: 'devices',
        label: 'Report Device as Lost',
        type: 'button',
        navigate: SETTINGS_NAVIGATE.devices,
      },
      {
        id: SETTINGS_ID.address,
        icon: 'map-marker',
        label: 'Saved Address',
        type: 'button',
        navigate: SETTINGS_NAVIGATE.address,
      },
    ],
  },
  {
    label: 'Payment',
    items: [
      {
        id: SETTINGS_ID.deposits,
        icon: 'calendar',
        label: 'Automatic deposits',
        type: 'button',
        navigate: SETTINGS_NAVIGATE.deposits,
        settingKey: Settings.Setting.AUTO_DEPOSIT_ENABLED,
      },
    ],
  },
  {
    label: 'Meal Plans',
    items: [
      {
        id: SETTINGS_ID.mealPlan,
        icon: 'meal-change',
        label: 'Change meal plan',
        type: 'button',
        navigate: SETTINGS_NAVIGATE.mealPlan,
      },
      {
        id: SETTINGS_ID.mealPurchase,
        icon: 'meal-purchase',
        label: 'Purchase meal plan',
        type: 'button',
        navigate: SETTINGS_NAVIGATE.mealPurchase,
      },
    ],
  },
  {
    label: 'Preferences',
    items: [
      {
        id: SETTINGS_ID.theme,
        icon: 'theme-dark-light-mode',
        label: 'Theme',
        type: 'button',
        navigate: SETTINGS_NAVIGATE.theme,
      },
      {
        id: SETTINGS_ID.home,
        icon: 'home-edit',
        label: 'Edit Home',
        type: 'button',
        navigate: SETTINGS_NAVIGATE.home,
      },
      {
        id: SETTINGS_ID.navigate,
        icon: 'more-menu',
        label: 'Edit navigate',
        type: 'button',
        navigate: SETTINGS_NAVIGATE.navigate,
      },
    ],
  },
  {
    label: 'Feedback & Support',
    items: [
      {
        id: SETTINGS_ID.feedback,
        icon: 'none',
        label: 'Send app feedback',
        type: 'button',
        navigate: SETTINGS_NAVIGATE.feedback,
      },
      { id: SETTINGS_ID.help, icon: 'help', label: 'Help', type: 'button', navigate: SETTINGS_NAVIGATE.help },
      {
        id: SETTINGS_ID.support,
        icon: 'mail',
        label: 'Email Support',
        type: 'button',
        navigate: SETTINGS_NAVIGATE.support,
      },
      {
        id: SETTINGS_ID.terms,
        icon: 'none',
        label: 'Terms of Use & Privacy Policy',
        type: 'button',
        navigate: SETTINGS_NAVIGATE.terms,
      },
    ],
  },
];
