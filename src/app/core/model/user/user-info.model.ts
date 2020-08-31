export interface UserInfo {
  id: string;
  userName: string;
  firstName: string;
  lastName: string;
  staleProfile: boolean;
  active: boolean;
  cashlessMediaStatus: number;
  email: string;
  guestUser: boolean;
  hasCashlessCard: boolean;
  institutionId: string;
  lastUpdatedProfile: string;
  locale: string;
  middleName: string;
  objectRevision: number;
  phone: string;
  status: number;
  timeZone: string;
  lastUpdatedCashless: Date;
  emailBounceMessage: string;
  emailBounceStatus: string;
  
}
