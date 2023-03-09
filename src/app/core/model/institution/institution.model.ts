import { GuestSetting } from '@sections/guest/model/guest-settings';
import { AuthenticationInfo } from '../authentication/authentication-info.model';

export interface Institution {
  id: string;
  objectRevision: number;
  name: string;
  shortName: string;
  timeZone: string;
  locale: string;
  authenticationSystemType: number; // See AuthenticationSystemType for valid values
  authenticationInfo: AuthenticationInfo;
  lastChangedTerms: Date;
  cashlessPaymentSystemType: number;
  active: boolean;
  payWithGETOnly: boolean;
  type: number;
  imageBannerFull: string;
}
export interface InstitutionLookupListItem {
  id: string;
  name: string;
  shortName: string;
  type: number;
  guestDeposit: number;
  guestLogin: number;
  guestLoginNotRequired: number;
  environmentName?: string;
  guestSettings: GuestSetting;
  acuteCare: boolean;
}
