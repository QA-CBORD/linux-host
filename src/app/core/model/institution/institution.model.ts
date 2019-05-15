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
}
