import { CONTENT_STRINGS_CATEGORIES, CONTENT_STRINGS_DOMAINS } from 'src/app/content-strings';

export const MOBILE_CREDENTIAL_CONFIGS = {
  HID: {
    UI_MSG: {
      WHEN_AVAILABLE: 'ID not added to Phone',
      WHEN_PROVISIONED: 'Mobile ID enabled',
      WHEN_SUSPENDED: '',
    },
    uiImageUrl: '/assets/icon/mobile_credential_btn.png',
    uiHelpIcon: '/assets/icon/mobile_credentila_quest_mark.png',
    terms: {
      domain: CONTENT_STRINGS_DOMAINS.get_web_gui,
      category: CONTENT_STRINGS_CATEGORIES.termsScreen,
      name: 'terms',
    }
  },
  ALLEGION: {
    UI_MSG: {
      WHEN_AVAILABLE: '',
      WHEN_PROVISIONED: '',
      WHEN_SUSPENDED: '',
    },
    uiImageUrl: '/assets/icon/mobile_credential_google_pay.png',
    uiHelpIcon: ''
  },
  APPLE: {
    UI_MSG: {
      WHEN_AVAILABLE: '',
      WHEN_PROVISIONED: '',
      WHEN_SUSPENDED: '',
    },
    uiImageUrl: '/assets/icon/Add_to_Apple_Wallet_rgb_US-UK.svg',
    uiHelpIcon: ''
  },
};

export interface MobileCredentialConfig {
  UI_MSG: {
    WHEN_AVAILABLE: string;
    WHEN_PROVISIONED: string;
    WHEN_SUSPENDED: string;
  };
  uiImageUrl: string;
  uiHelpIcon: string;
  terms: any;
}
