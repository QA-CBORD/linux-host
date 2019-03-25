export interface MStartupInfo {
    showMessage: number;
    minSupportedVersionFailure: number;
    message: string;
    messageTitle: string;
    messageDigest: string;
    showOnce: number;
    action: string; /// 'none'= Just show the message, 'store'= I have no idea, 'block' = 'Do not allow user to proceed'
    minSupportedVersion: string;
}
