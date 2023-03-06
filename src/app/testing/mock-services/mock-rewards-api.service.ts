import { UserRewardTrackInfo } from '@sections/rewards';
import { OPT_IN_STATUS, CLAIM_STATUS, LEVEL_STATUS } from '@sections/rewards/rewards.config';
import { of } from 'rxjs';

export const USER_REWARD_TRACKINFO_LIST_MOCK: UserRewardTrackInfo[] = [
  {
    trackID: '1',
    trackName: 'Track 1',
    trackDescription: 'Description for Track 1',
    trackStartDate: new Date('2022-01-01T00:00:00Z'),
    trackEndDate: new Date('2022-12-31T23:59:59Z'),
    userOptInStatus: OPT_IN_STATUS.yes,
    userOptInDate: new Date('2022-01-01T00:00:00Z'),
    userLevel: 1,
    userCurrentPoints: 500,
    userTotalPointsSpent: 0,
    userExperiencePoints: 1000,
    hasLevels: true,
    hasRedeemableRewards: true,
    trackLevels: [
      {
        level: 1,
        name: 'Level 1',
        requiredPoints: 500,
        redeemed: false,
        userClaimableRewards: [
          {
            id: '1',
            startDate: new Date('2022-01-01T00:00:00Z'),
            endDate: new Date('2022-12-31T23:59:59Z'),
            name: 'Reward 1',
            shortDescription: 'Short description for Reward 1',
            description: 'Description for Reward 1',
            claimLevel: 1,
            claimStatus: CLAIM_STATUS.unearned,
          },
          {
            id: '2',
            startDate: new Date('2022-01-01T00:00:00Z'),
            endDate: new Date('2022-12-31T23:59:59Z'),
            name: 'Reward 2',
            shortDescription: 'Short description for Reward 2',
            description: 'Description for Reward 2',
            claimLevel: 1,
            claimStatus: CLAIM_STATUS.unearned,
          },
        ],
        description: 'Description for Level 1',
        status: LEVEL_STATUS.unlocked,
      },
      {
        level: 2,
        name: 'Level 2',
        requiredPoints: 1000,
        redeemed: false,
        userClaimableRewards: [
          {
            id: '3',
            startDate: new Date('2022-01-01T00:00:00Z'),
            endDate: new Date('2022-12-31T23:59:59Z'),
            name: 'Reward 3',
            shortDescription: 'Short description for Reward 3',
            description: 'Description for Reward 3',
            claimLevel: 2,
            claimStatus: CLAIM_STATUS.unearned,
          },
        ],
        description: 'Description for Level 2',
        status: LEVEL_STATUS.locked,
      },
    ],
    accumulationRules: [
      {
        startDate: new Date('2022-01-01T00:00:00Z'),
        endDate: new Date('2022-12-31T23:59:59Z'),
        activityType: 1,
        pointsPer: 5,
        description: 'Description for Accumulation Rule 1',
      },
      {
        startDate: new Date('2022-01-01T00:00:00Z'),
        endDate: new Date('2022-12-31T23:59:59Z'),
        activityType: 2,
        pointsPer: 10,
        description: 'Description for Accumulation Rule 2',
      },
    ],
    redeemableRewards: [
      {
        id: 'redeemable-1',
        startDate: new Date('2022-06-01'),
        endDate: new Date('2022-06-30'),
        name: 'Mock Redeemable Reward 1',
        shortDescription: 'A short description for mock redeemable reward 1',
        description: 'A long description for mock redeemable reward 1',
        pointCost: 100,
        trackId: 'abc123',
        userId: 'user-1',
        rewardLevel: 1,
        status: CLAIM_STATUS.earned,
        claimedTime: new Date('2022-06-15'),
        receivedTime: new Date('2022-06-15'),
        rewardClass: 1,
        pointsSpent: 100,
        itemName: 'Mock Redeemable Reward 1',
        rewardId: 'redeemable-1',
        claimLevel: 1,
        claimStatus: 2,
      },
      {
        id: 'redeemable-2',
        startDate: new Date('2022-07-01'),
        endDate: new Date('2022-07-31'),
        name: 'Mock Redeemable Reward 2',
        shortDescription: 'A short description for mock redeemable reward 2',
        description: 'A long description for mock redeemable reward 2',
        pointCost: 200,
        trackId: 'abc123',
        userId: 'user-1',
        rewardLevel: 2,
        status: CLAIM_STATUS.unearned,
        claimedTime: null,
        receivedTime: null,
        rewardClass: 1,
        pointsSpent: 0,
        itemName: 'Mock Redeemable Reward 2',
        rewardId: 'redeemable-2',
        claimLevel: 3,
        claimStatus: 4,
      },
    ],
  },
];

export class MockRewardsApiService {
  getUserRewardTrackInfo = jest.fn().mockReturnValue(of(USER_REWARD_TRACKINFO_LIST_MOCK[0]));
  constructor(){
    // this.getUserRewardTrackInfo.mockReturnValue(of(USER_REWARD_TRACKINFO_LIST_MOCK[0]));
  }
}
