import { AuthenticationInfo } from '../authentication/authentication-info.model';

export class InstitutionInfo {
  id: string;
  name: string;
  shortName: string;
  timeZone: string;
  locale: string;
  authenticationSystemType: number; /// 0=INSTITUTION, 1=HOSTED
  authenticationInfo: AuthenticationInfo;
  lastChangedTerms: string;
  cashlessPaymentSystemType: number;
  type: number; /// 0=CNU (old icon), 1=Hosipitals (new icon)
}
