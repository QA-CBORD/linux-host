export interface MAuthenticationInfo {
    authenticationType: string; // inst url if = 'CAS', 'SSO_GENERIC', 'OKTA_EXT'
    cookieName: string;
    fieldCashlessID: string;
    fieldEmail: string;
    showPreloginPage: boolean;
    casValidateURL: string;
    casLoginURL: string;
    casLogoutURL: string;
    logoutURL: string;
}
