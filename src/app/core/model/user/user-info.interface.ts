export interface MUserInfo {
    id: string;
    userName: string;
    objectRevision: number;
    institutionId: string;
    firstName: string;
    middleName: string;
    lastName: string;
    status: number;
    staleProfile: boolean;
    active: boolean;
    timeZone: string;
    locale: string;
    cashlessMediaStatus: number;
    guestUser: boolean;
    hasCashlessCard: boolean;
    lastUpdatedCashless: Date;
    lastUpdatedProfile: Date;
    emailBounceMessage: string;
    emailBounceStatus: string;
}
