export enum GUEST_ROUTES {
  startup = 'startup',
  entry = 'entry',
  institutions = 'institutions',
  login = 'login',
  pre_login = 'pre-login',
  external = 'external-login',
  forgotPassword = 'forgot-password',
  patronRegistration = 'patron-registration',
  guestRegistration = 'guest-registration',
}

export enum AUTHENTICATION_SYSTEM_TYPE {
  HOSTED = 1,
  LDAP,
  SSO_GENERIC, // generic external SSO that passes-through user id (e.g. shibboelth, kerberos)
  CAS,
  OKTA,
  OKTA_EXT,
}
