
export const MOBILE_CREDENTIAL_CONFIGS = {
  HID: {
    UI_MSG: {
      WHEN_AVAILABLE: 'ID not added to Phone',
      WHEN_PROVISIONED: 'Mobile ID enabled',
      WHEN_SUSPENDED: '',
    },
    uiImageUrl: '/assets/icon/mobile_credential_btn.png',
    uiHelpIcon: '/assets/icon/mobile_credentila_quest_mark.png',
  },
  ALLEGION: {
    UI_MSG: {
      WHEN_AVAILABLE: '',
      WHEN_PROVISIONED: '',
      WHEN_SUSPENDED: '',
    },
    uiImageUrl: '',
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
}
