export interface MStartupInfo {
  readonly showMessage: number;
  readonly minSupportedVersionFailure: number;
  readonly message: string;
  readonly messageTitle: string;
  readonly messageDigest: string;
  readonly showOnce: number;
  readonly action: string; /// 'none'= Just show the message, 'store'= I have no idea, 'block' = 'Do not allow user to proceed'
  readonly minSupportedVersion: string;
}
