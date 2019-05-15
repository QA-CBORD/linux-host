import { LEVEL_STATUS } from '../rewards.config';

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

export interface RedeemableRewardInfo {
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
}

export interface LevelInfo {
  level: number;
  name: string;
  requiredPoints: number;
  status: LEVEL_STATUS;
  rewards: ClaimableRewardInfo[];
}
