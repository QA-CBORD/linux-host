
export enum OPT_IN_STATUS {
  yes = 1,
  no = 0,
}

export enum PopupTypes {
  REDEEM = 'REDEEM',
  SCAN = 'SCAN',
  SUCCESS = 'SUCCESS',
  CLAIM = 'CLAIM',
  RETRY = 'RETRY',
  OPT_IN = 'OPT_IN',
  CANCEL = 'CANCEL',
}

export enum LEVEL_STATUS {
  locked = 0,
  unlocked = 1,
  claimed = 2,
  received = 3,
}

export enum CLAIM_STATUS {
  unearned = 0,
  earned = 1,
  claimed = 2,
  received = 3,
}

export interface UserRewardTrackInfo {
  trackID: string;
  trackName: string;
  trackDescription: string;
  trackStartDate: Date;
  trackEndDate: Date;
  userOptInStatus: number;
  userOptInDate: Date;
  userLevel: number;
  userCurrentPoints: number;
  userTotalPointsSpent: number;
  userExperiencePoints: number;
  hasLevels: boolean;
  hasRedeemableRewards: boolean;
  trackLevels: UserTrackLevelInfo[];
  accumulationRules: AccumulationRuleInfo[];
  redeemableRewards: RedeemableRewardInfo[];
}

export interface UserRewardTrackInfoInfoList {
  institutions: Array<UserRewardTrackInfo>;
}

export interface UserTrackLevelInfo {
  level: number;
  name: string;
  requiredPoints: number;
  redeemed: boolean;
  userClaimableRewards: ClaimableRewardInfo[];
  description?: string;
  status?: LEVEL_STATUS;
}

export interface LevelInfo {
  level: number;
  name: string;
  description?: string;
  status: LEVEL_STATUS;
  rewards: ClaimableRewardInfo[];
}

export interface AccumulationRuleInfo {
  startDate: Date;
  endDate: Date;
  activityType: number;
  pointsPer: number;
  description: string;
}

export interface ClaimableRewardInfo {
  id: string;
  startDate: Date;
  endDate: Date;
  name: string;
  shortDescription: string;
  description: string;
  claimLevel: number;
  claimStatus: number;
}

export interface RedeemableRewardInfo extends UserFulfillmentActivityInfo, ClaimableRewardInfo {
  id: string;
  startDate: Date;
  endDate: Date;
  name: string;
  shortDescription: string;
  description: string;
  pointCost: number;
}

export interface UserFulfillmentActivityInfo {
  trackId: string;
  userId: string;
  rewardLevel: number;
  status: number;
  claimedTime: Date;
  receivedTime: Date;
  rewardClass: number;
  pointsSpent: number;
  itemName: string;
  rewardId: string;
  id: string;
  shortDescription?: string;
}
