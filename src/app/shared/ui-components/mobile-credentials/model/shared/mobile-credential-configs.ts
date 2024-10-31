
export const MOBILE_CREDENTIAL_CONFIGS = {
  HID: {
    UI_MSG: {
      WHEN_AVAILABLE: '',
      WHEN_PROVISIONED: '',
      WHEN_SUSPENDED: '',
      WHEN_REVOKED: '',
      WHEN_PROCESSING: ''
    },
    uiImageUrl: '/assets/icon/mobile_credential_btn.png',
    uiHelpIcon: '/assets/icon/mobile_credentila_quest_mark.png',
  },
  HID_WALLET: {
    UI_MSG: {
      WHEN_AVAILABLE: '',
      WHEN_PROVISIONED: '',
      WHEN_SUSPENDED: '',
      WHEN_REVOKED: '',
      WHEN_PROCESSING: ''
    },
    uiImageUrl: '/assets/icon/mobile_credential_google_pay.png',
    uiHelpIcon: '',
  },
  ALLEGION: {
    UI_MSG: {
      WHEN_AVAILABLE: '',
      WHEN_PROVISIONED: '',
      WHEN_SUSPENDED: '',
      WHEN_REVOKED: '',
      WHEN_PROCESSING: ''
    },
    uiImageUrl: '/assets/icon/mobile_credential_google_pay.png',
    uiHelpIcon: ''
  },
  APPLE: {
    UI_MSG: {
      WHEN_AVAILABLE: '',
      WHEN_PROVISIONED: '',
      WHEN_SUSPENDED: '',
      WHEN_REVOKED: ''
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
    WHEN_REVOKED: string;
    WHEN_PROCESSING: string;
  };
  uiImageUrl: string;
  uiHelpIcon: string;
}
