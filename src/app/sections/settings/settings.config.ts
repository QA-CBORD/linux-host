import { SettingsSectionConfig, SETTINGS_VALIDATIONS } from './models/setting-items-config.model';
import { Settings } from 'src/app/app.global';
import {
  handleOpenHTMLModal,
  openSiteURL,
  openModal,
  toggleBiometricStatus,
  setBiometricStatus,
  handlePinAccess,
} from './helpers/setting-item.helper';
import { CONTENT_STRINGS_DOMAINS, CONTENT_STRINGS_CATEGORIES } from 'src/app/content-strings';
import { HTMLRendererComponent } from '@shared/ui-components/html-renderer/html-renderer.component';
import { PhoneEmailComponent } from '@shared/ui-components/phone-email/phone-email.component';
import { AuthTypes } from '@core/utils/auth-types.enum';
import { EditHomePageModalComponent } from '@shared/ui-components/edit-home-page-modal/edit-home-page-modal.component';
import { SETTINGS_ID } from './models/settings-id.enum';
import { LOCAL_ROUTING as ORDERING_ROUTING } from '@sections/ordering/ordering.config';
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
  address = 'my-addresses',
  paymentMethods = 'payment-methods',
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
        id: SETTINGS_ID.updatePhoto,
        icon: 'update-photo',
        label: 'Update photo',
        type: 'button',
        navigate: [SETTINGS_NAVIGATE.updatePhoto],
        validations: [{ type: SETTINGS_VALIDATIONS.SettingEnable, value: Settings.Setting.PHOTO_UPLOAD_ENABLED }],
      },
      {
        id: SETTINGS_ID.lostCard,
        label: '',
        icon: 'card-lost',
        toggleLabel: { checked: 'Report card as found', unchecked: 'Report card as lost' },
        type: 'button',
        // getToggleStatus: getCardStatus,
        navigate: [SETTINGS_NAVIGATE.lostCard],
        validations: [{ type: SETTINGS_VALIDATIONS.SettingEnable, value: Settings.Setting.REPORT_LOST_CARD_ENABLED }],
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
        setCallback: openModal,
        modalContent: {
          component: PhoneEmailComponent,
        },
      },
      // {
      //   id: SETTINGS_ID.password,
      //   icon: 'key',
      //   label: 'Change password',
      //   type: 'button',
      //   setCallback: openSiteURL,
      //   navigateExternal: { type: 'link', value: 'login.php?password=forgot' },
      // },
      {
        id: SETTINGS_ID.biometrics,
        icon: '',
        label: '',
        type: 'toggle',
        setCallback: toggleBiometricStatus,
        setToggleStatus: setBiometricStatus,
        validations: [
          { type: SETTINGS_VALIDATIONS.SettingEnable, value: Settings.Setting.PIN_ENABLED },
          { type: SETTINGS_VALIDATIONS.Biometric, value: 'biometric' },
        ],
      },
      {
        id: SETTINGS_ID.pin,
        icon: 'pin-pad',
        label: 'Change PIN',
        type: 'button',
        setCallback: handlePinAccess,
        validations: [{ type: SETTINGS_VALIDATIONS.SettingEnable, value: Settings.Setting.PIN_ENABLED }],
      },
      {
        id: SETTINGS_ID.address,
        icon: 'map-marker',
        label: 'Saved Addresses',
        type: 'button',
        navigate: [SETTINGS_NAVIGATE.address],
      },
    ],
  },
  // {
  //   label: 'Payment',
  //   items: [
  //     {
  //       id: SETTINGS_ID.paymentMethods,
  //       icon: 'credit-card',
  //       label: 'Payment methods',
  //       type: 'button',
  //       navigate: SETTINGS_NAVIGATE.paymentMethods,
  //     },
  //     {
  //       id: SETTINGS_ID.deposits,
  //       icon: 'calendar',
  //       label: 'Automatic deposits',
  //       type: 'button',
  //       navigate: SETTINGS_NAVIGATE.deposits,
  //       validations: [{ type: SETTINGS_VALIDATIONS.SettingEnable, value: Settings.Setting.AUTO_DEPOSIT_ENABLED }],
  //     },
  //   ],
  // },
  {
    label: 'Meal Plans',
    items: [
      {
        id: SETTINGS_ID.mealPlan,
        icon: 'meal-change',
        label: 'Change meal plan',
        type: 'button',
        setCallback: openSiteURL,
        navigateExternal: { type: 'link', value: 'change_meal_plan.php' },
        validations: [{ type: SETTINGS_VALIDATIONS.SettingEnable, value: Settings.Setting.MEAL_CHANGE_PLAN_ENABLED }],
      },
      {
        id: SETTINGS_ID.mealPurchase,
        icon: 'meal-purchase',
        label: 'Purchase meal plan',
        type: 'button',
        setCallback: openSiteURL,
        navigateExternal: { type: 'link', value: 'purchase_meal_plan.php' },
        validations: [{ type: SETTINGS_VALIDATIONS.SettingEnable, value: Settings.Setting.MEAL_PURCHASE_PLAN_ENABLED }],
      },
    ],
  },
  {
    label: 'Preferences',
    items: [
      // {
      //   id: SETTINGS_ID.theme,
      //   icon: 'theme-dark-light-mode',
      //   label: 'Theme',
      //   type: 'button',
      //   navigate: SETTINGS_NAVIGATE.theme,
      // },
      {
        id: SETTINGS_ID.home,
        icon: 'home-edit',
        label: 'Edit Home',
        type: 'button',
        setCallback: openModal,
        modalContent: {
          component: EditHomePageModalComponent,
        },
      },
      // {
      //   id: SETTINGS_ID.navigate,
      //   icon: 'more-menu',
      //   label: 'Edit navigate',
      //   type: 'button',
      //   navigate: SETTINGS_NAVIGATE.navigate,
      // },
    ],
  },
  {
    label: 'Feedback & Support',
    items: [
      {
        id: SETTINGS_ID.help,
        icon: 'help',
        label: 'Help',
        type: 'button',
        modalContent: {
          contentStrings: [
            {
              domain: CONTENT_STRINGS_DOMAINS.get_web_gui,
              category: CONTENT_STRINGS_CATEGORIES.aboutScreen,
              name: 'about_getfunds',
            },
            {
              domain: CONTENT_STRINGS_DOMAINS.get_web_gui,
              category: CONTENT_STRINGS_CATEGORIES.aboutScreen,
              name: 'contact_info',
            },
            {
              domain: CONTENT_STRINGS_DOMAINS.get_web_gui,
              category: CONTENT_STRINGS_CATEGORIES.termsScreen,
              name: 'terms',
            },
            {
              domain: CONTENT_STRINGS_DOMAINS.get_web_gui,
              category: CONTENT_STRINGS_CATEGORIES.aboutScreen,
              name: 'patent',
            },
            {
              domain: CONTENT_STRINGS_DOMAINS.get_web_gui,
              category: CONTENT_STRINGS_CATEGORIES.aboutScreen,
              name: 'org',
            },
          ],
          appendStrings: [
            '<br><br>Address geocoding and reverse geocoding is &copy; OpenStreetMap contributors. <a href="http://www.openstreetmap.org/copyright">Copyright and License</a>',
            '<br><br>Copyright © 2012- 2020 The CBORD Group, Inc.\r\n',
          ],
          component: HTMLRendererComponent,
        },
        setCallback: handleOpenHTMLModal,
      },
      {
        id: SETTINGS_ID.support,
        icon: 'mail',
        label: 'Email Support',
        type: 'button',
        setCallback: openSiteURL,
        navigateExternal: { type: 'email', value: Settings.Setting.SUPPORT_EMAIL },
      },
      {
        id: SETTINGS_ID.terms,
        icon: 'none',
        label: 'Terms of Use & Privacy Policy',
        type: 'button',
        modalContent: {
          contentStrings: [
            {
              domain: CONTENT_STRINGS_DOMAINS.get_web_gui,
              category: CONTENT_STRINGS_CATEGORIES.termsScreen,
              name: 'terms',
            },
          ],
          component: HTMLRendererComponent,
        },
        setCallback: handleOpenHTMLModal,
      },
    ],
  },
];
