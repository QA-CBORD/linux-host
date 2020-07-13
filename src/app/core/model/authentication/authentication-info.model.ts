
export enum AuthenticationType {
  CAS = 'CAS',
  SSO_GENERIC = 'SSO_GENERIC',
  OKTA_EXT = 'OKTA_EXT'
}

export interface AuthenticationInfo {

  readonly authenticationType: string; // inst url if = 'CAS', 'SSO_GENERIC', 'OKTA_EXT'
  readonly cookieName: string;
  readonly fieldCashlessID: string;
  readonly fieldEmail: string;
  readonly showPreloginPage: boolean;
  readonly casValidateURL: string;
  readonly casLoginURL: string;
  readonly casLogoutURL: string;
  readonly logoutURL: string;
}
