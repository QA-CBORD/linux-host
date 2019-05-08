export interface MUserRewardTrackInfo {
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
    trackLevels: MUserTrackLevelInfo[];
    accumulationRules: MAccumulationRuleInfo[];
    redeemableRewards: MRedeemableRewardInfo[];
}

export interface MUserRewardTrackInfoInfoList {
    institutions: Array<MUserRewardTrackInfo>;
}

export interface MUserTrackLevelInfo {
    level: number;
    name: string;
    requiredPoints: number;
    redeemed: boolean;
    userClaimableRewards: MClaimableRewardInfo[];
}

export interface MAccumulationRuleInfo {
    startDate: Date;
    endDate: Date;
    activityType: number;
    pointsPer: number;
    description: string;
}

export interface MClaimableRewardInfo {
    id: string;
    startDate: Date;
    endDate: Date;
    name: string;
    shortDescription: string;
    description: string;
    claimLevel: number;
    claimStatus: number;
}

export interface MRedeemableRewardInfo {
    id: string;
    startDate: Date;
    endDate: Date;
    name: string;
    shortDescription: string;
    description: string;
    pointCost: number;
}

export interface MUserFulfillmentActivityInfo {
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
