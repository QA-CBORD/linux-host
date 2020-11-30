
export const MOBILE_CREDENTIAL_CONFIGS = {
  HID: {
    UI_MSG: {
      WHEN_AVAILABLE: 'ID not added to Phone',
      WHEN_PROVISIONED: 'Mobile ID enabled',
      WHEN_SUSPENDED: '',
      WHEN_REVOKED: 'Mobile ID revoked',
      WHEN_PROCESSING: 'Mobile ID installed [not ready]'
    },
    uiImageUrl: '/assets/icon/mobile_credential_btn.png',
    uiHelpIcon: '/assets/icon/mobile_credentila_quest_mark.png',
  },
  ALLEGION: {
    UI_MSG: {
      WHEN_AVAILABLE: '',
      WHEN_PROVISIONED: 'ID added to Gpay',
      WHEN_SUSPENDED: '',
      WHEN_REVOKED: 'Mobile ID revoked',
      WHEN_PROCESSING: 'ID added to Gpay [not ready]'
    },
    uiImageUrl: '/assets/icon/mobile_credential_google_pay.png',
    uiHelpIcon: ''
  },
  APPLE: {
    UI_MSG: {
      WHEN_AVAILABLE: '',
      WHEN_PROVISIONED: '',
      WHEN_SUSPENDED: '',
      WHEN_REVOKED: 'Mobile ID revoked'
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
