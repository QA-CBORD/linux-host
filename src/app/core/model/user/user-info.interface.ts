export interface MUserInfo {
  readonly id: string;
  readonly userName: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly staleProfile: boolean;
  readonly active: boolean;
  readonly cashlessMediaStatus: number;
  readonly email: string;
  readonly guestUser: boolean;
  readonly hasCashlessCard: boolean;
  readonly institutionId: string;
  readonly lastUpdatedProfile: string;
  readonly locale: string;
  readonly middleName: string;
  readonly objectRevision: number;
  readonly phone: string;
  readonly status: number;
  readonly timeZone: string;
}
