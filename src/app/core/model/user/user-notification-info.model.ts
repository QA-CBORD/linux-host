export interface UserNotificationInfo {
  readonly type: number;
  readonly value: string;
  readonly provider: string;
  readonly status: number;
  readonly bounceStatus: number;
}
