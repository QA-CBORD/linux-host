import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { RewardsApiService, RewardsService } from '.';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { TestBed } from '@angular/core/testing';
import { UserFulfillmentActivityInfo, RedeemableRewardInfo, UserRewardTrackInfo, UserTrackLevelInfo } from '../models';
import { CLAIM_STATUS, LEVEL_STATUS, OPT_IN_STATUS } from '../rewards.config';
import { TabsConfig } from '@core/model/tabs/tabs.model';

describe('RewardsService', () => {
  let rewardsService: RewardsService;
  const rewardsApiService = {
    getUserRewardTrackInfo: jest.fn(),
    getUserRewardHistoryInfo: jest.fn(),

  }
  const contentStringsFacadeService = {
    retrieveContentStringListByRequest: jest.fn()
  }
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RewardsService,
        { provide: RewardsApiService, useValue: rewardsApiService },
        {
          provide: ContentStringsFacadeService,
          useValue: { retrieveContentStringListByRequest: jest.fn(), fetchContentString$: jest.fn() },
        },
      ]
    });
    rewardsService = TestBed.inject(RewardsService);
  });

  it('should be created', () => {
    expect(rewardsService).toBeTruthy();
  });

  it('should get rewardTrack observable', () => {
    const rewardTrack = rewardsService.rewardTrack;
    expect(rewardTrack).toBeInstanceOf(Observable);
  });

  it('should get rewardHistory observable', () => {
    const rewardHistory = rewardsService.rewardHistory;
    expect(rewardHistory).toBeInstanceOf(Observable);
  });

  it('should return history list of rewards with received status', () => {
    const mockRewardHistory = [
      { id: 1, status: CLAIM_STATUS.received } as unknown as UserFulfillmentActivityInfo,
      { id: 2, status: CLAIM_STATUS.claimed } as unknown as UserFulfillmentActivityInfo,
    ];
    const mockRewards = [
      { id: 1, name: 'Reward 1' } as unknown as RedeemableRewardInfo,
      { id: 2, name: 'Reward 2' } as unknown as RedeemableRewardInfo,
    ];

    jest.spyOn(rewardsService, 'combineAllRewards').mockReturnValue(of(mockRewards));
    jest.spyOn(rewardsService as any, 'rewardHistory', 'get').mockReturnValue(of(mockRewardHistory));

    rewardsService.getHistoryListRewards().subscribe(result => {
      expect(result.length).toBe(1);
      expect(result[0].id).toBe(1);
    });
  });

  it('should combine track levels and redeemable rewards', () => {
    const mockTrackLevels = [
      { id: 1, name: 'Level 1', userClaimableRewards: [] },
      { id: 2, name: 'Level 2', userClaimableRewards: [{ id: 3, name: 'Reward 3' }] },
    ];
    const mockRedeemableRewards = [
      { id: 4, name: 'Reward 4' },
      { id: 5, name: 'Reward 5' },
    ];

    jest.spyOn(rewardsService as any, 'rewardTrack', 'get').mockReturnValue(of({ mockTrackLevels, mockRedeemableRewards }));

    rewardsService.combineAllRewards().subscribe(result => {
      expect(result.length).toBe(3);
      expect(result.map(r => r.name)).toEqual(['Reward 4', 'Reward 5', 'Reward 3']);
    });
  });

  it('should return user reward track info and history info', () => {
    const mockTrackInfo: UserRewardTrackInfo = {} as UserRewardTrackInfo;
    const mockHistoryArray: UserFulfillmentActivityInfo[] = [];

    jest.spyOn(rewardsApiService, 'getUserRewardTrackInfo').mockReturnValue(of(mockTrackInfo));
    jest.spyOn(rewardsApiService, 'getUserRewardHistoryInfo').mockReturnValue(of(mockHistoryArray));

    rewardsService.getAllData().subscribe(([trackInfo, historyArray]) => {
      expect(trackInfo).toEqual(mockTrackInfo);
      expect(historyArray).toEqual(mockHistoryArray);
    });
  });

  it('should handle error when getting user reward track info', () => {
    const errorMessage = 'Error fetching track info';

    jest.spyOn(rewardsApiService, 'getUserRewardTrackInfo').mockReturnValue(throwError(errorMessage));

    rewardsService.getAllData().subscribe({
      error: (error) => {
        expect(error).toBe(errorMessage);
      }
    });
  });

  it('should handle error when getting user reward history info', () => {
    const errorMessage = 'Error fetching history info';

    jest.spyOn(rewardsApiService, 'getUserRewardHistoryInfo').mockReturnValue(throwError(errorMessage));

    rewardsService.getAllData().subscribe({
      error: (error) => {
        expect(error).toBe(errorMessage);
      }
    });
  });

  it('should return user opt-in status', () => {
    const mockOptInStatus = OPT_IN_STATUS.yes;

    jest.spyOn(rewardsService as any, 'rewardTrack', 'get').mockReturnValue(of({ userOptInStatus: mockOptInStatus }));

    rewardsService.getUserOptInStatus().subscribe(optInStatus => {
      expect(optInStatus).toEqual(mockOptInStatus);
    });
  });

  it('should return rewards tabs configuration with levels and store', () => {
    jest.spyOn(rewardsService as any, 'rewardTrack', 'get').mockReturnValue(of({ hasLevels: true, hasRedeemableRewards: true }));

    rewardsService.getRewardsTabsConfig().subscribe((tabConfig) => {
      const expectedConfig: TabsConfig = {
        tabs: [
          { name: 'Levels', route: '/levels', active: true },
          { name: 'Store', route: '/store', active: false },
          { name: 'History', route: '/history', active: false }
        ]
      };
      expect(tabConfig).toEqual(expectedConfig);
    });
  });

  it('should return rewards tabs configuration without levels and with store', () => {
    jest.spyOn(rewardsService as any, 'rewardTrack', 'get').mockReturnValue(of({ hasLevels: false, hasRedeemableRewards: true }));

    rewardsService.getRewardsTabsConfig().subscribe((tabConfig) => {
      const expectedConfig: TabsConfig = {
        tabs: [
          { name: 'Store', route: '/store', active: true },
          { name: 'History', route: '/history', active: false }
        ]
      };
      expect(tabConfig).toEqual(expectedConfig);
    });
  });

  it('should return rewards tabs configuration without levels and store', () => {
    jest.spyOn(rewardsService as any, 'rewardTrack', 'get').mockReturnValue(of({ hasLevels: false, hasRedeemableRewards: false }));

    rewardsService.getRewardsTabsConfig().subscribe((tabConfig) => {
      const expectedConfig: TabsConfig = {
        tabs: [
          { name: 'History', route: '/history', active: true }
        ]
      };
      expect(tabConfig).toEqual(expectedConfig);
    });
  });


  it('should return track levels', () => {
    const mockUserInfo = {
      trackLevels: [
        { level: 1, userClaimableRewards: [] },
        { level: 2, userClaimableRewards: [] },
      ]
    };

    jest.spyOn(rewardsService as any, 'rewardTrack', 'get').mockReturnValue(of(mockUserInfo));

    rewardsService.getTrackLevels().subscribe((trackLevels) => {
      expect(trackLevels.length).toBe(2);
      expect(trackLevels[0].level).toBe(1);
      expect(trackLevels[1].level).toBe(2);
    });
  });

  it('should return store rewards', () => {
    const mockRedeemableRewards: RedeemableRewardInfo[] = [
      { id: '1', name: 'Reward 1' } as RedeemableRewardInfo,
      { id: '2', name: 'Reward 2' } as RedeemableRewardInfo,
    ];

    jest.spyOn(rewardsService as any, 'rewardTrack', 'get').mockReturnValue(of({ redeemableRewards: mockRedeemableRewards }));

    rewardsService.getStoreRewards().subscribe((rewards) => {
      expect(rewards.length).toBe(2);
      expect(rewards[0].name).toBe('Reward 1');
      expect(rewards[1].name).toBe('Reward 2');
    });
  });

  it('should return active store rewards', () => {
    const mockRedeemableRewards: RedeemableRewardInfo[] = [
      { id: '1', name: 'Reward 1' } as RedeemableRewardInfo,
      { id: '2', name: 'Reward 2' } as RedeemableRewardInfo,
    ];
    const mockRewardHistory: UserFulfillmentActivityInfo[] = [
      { rewardId: '1', status: CLAIM_STATUS.claimed } as UserFulfillmentActivityInfo,
      { rewardId: '3', status: CLAIM_STATUS.claimed } as UserFulfillmentActivityInfo,
    ];

    jest.spyOn(rewardsService as any, 'rewardTrack', 'get').mockReturnValue(of({ redeemableRewards: mockRedeemableRewards }));
    jest.spyOn(rewardsService, 'rewardHistory', 'get').mockReturnValue(of(mockRewardHistory));

    rewardsService.getStoreActiveRewards().subscribe((activeRewards) => {
      expect(activeRewards.length).toBe(1);
      expect(activeRewards[0].rewardId).toBe(1);
    });
  });

  it('should initialize content strings list', () => {
    const mockRes = [{ name: 'String1', value: 'Value1' }, { name: 'String2', value: 'Value2' }];
    const mockRes0 = [{ name: 'String3', value: 'Value3' }];

    jest.spyOn(contentStringsFacadeService, 'retrieveContentStringListByRequest')
      .mockReturnValueOnce(of(mockRes))
      .mockReturnValueOnce(of(mockRes0));

    rewardsService.initContentStringsList().subscribe((contentStrings) => {
      expect(contentStrings.length).toBe(3);
      expect(contentStrings[0].name).toBe('String1');
      expect(contentStrings[1].value).toBe('Value2');
      expect(contentStrings[2].name).toBe('String3');
      expect(contentStrings[2].value).toBe('Value3');
      expect(rewardsService['content']).toEqual({ 'String1': 'Value1', 'String2': 'Value2', 'String3': 'Value3' });
    });
  });

  it('should get content value by name', () => {
    const mockContent = {
      String1: 'Value1',
      String2: 'Value2',
      String3: 'Value3'
    };

    rewardsService['content'] = mockContent;

    const result = rewardsService.getContentValueByName('String2');

    expect(result).toBe('Value2');
  });

  it('should extract from history by reward id', () => {
    const mockRewardHistoryList: UserFulfillmentActivityInfo[] = [
      { rewardId: '1', status: CLAIM_STATUS.claimed, shortDescription: 'Short 1', itemName: 'Name 1' } as UserFulfillmentActivityInfo,
      { rewardId: '2', status: CLAIM_STATUS.received, shortDescription: 'Short 2', itemName: 'Name 2' } as UserFulfillmentActivityInfo,
    ];

    rewardsService['rewardHistoryList'] = mockRewardHistoryList;

    const result = rewardsService.extractFromHistoryByRewardId('2');

    expect(result.rewardId).toBe('2');
    expect(result.status).toBe(CLAIM_STATUS.received);
    expect(result.shortDescription).toBe('Short 2');
    expect(result.itemName).toBe('Name 2');
  });

  it('should extract from history by status', () => {
    const mockHistory: UserFulfillmentActivityInfo[] = [
      { rewardId: '1', status: CLAIM_STATUS.claimed } as UserFulfillmentActivityInfo,
      { rewardId: '2', status: CLAIM_STATUS.received } as UserFulfillmentActivityInfo,
      { rewardId: '3', status: CLAIM_STATUS.claimed } as UserFulfillmentActivityInfo,
    ];
    const mockRewards: RedeemableRewardInfo[] = [
      { id: '1', shortDescription: 'Short 1', itemName: 'Name 1' } as RedeemableRewardInfo,
      { id: '3', shortDescription: 'Short 3', itemName: 'Name 3' } as RedeemableRewardInfo,
    ];

    const result = rewardsService['extractFromHistoryByStatus'](mockHistory, mockRewards, CLAIM_STATUS.claimed, false);

    expect(result.length).toBe(2);
    expect(result[0].rewardId).toBe('1');
    expect(result[1].rewardId).toBe('3');
    expect(result[0].status).toBe(CLAIM_STATUS.claimed);
    expect(result[1].status).toBe(CLAIM_STATUS.claimed);
    expect(result[0].shortDescription).toBe('Short 1');
    expect(result[1].shortDescription).toBe('Short 3');
  });

  it('should get level status', () => {
    const mockLevelInfo = { level: 2, userClaimableRewards: [{ claimStatus: CLAIM_STATUS.claimed }] } as UserTrackLevelInfo;
    const mockUserLevel = 3;

    const status = rewardsService['getLevelStatus'](mockLevelInfo, mockUserLevel);

    expect(status).toBe(LEVEL_STATUS.claimed);
  });

  it('should sort by level', () => {
    const mockLevelInfoArray: UserTrackLevelInfo[] = [
      { level: 3, userClaimableRewards: [], description: '', status: LEVEL_STATUS.locked } as UserTrackLevelInfo,
      { level: 1, userClaimableRewards: [], description: '', status: LEVEL_STATUS.unlocked } as UserTrackLevelInfo,
      { level: 2, userClaimableRewards: [], description: '', status: LEVEL_STATUS.claimed } as UserTrackLevelInfo,
    ];

    const sortedLevels = rewardsService['sortByLevel'](mockLevelInfoArray);

    expect(sortedLevels.length).toBe(3);
    expect(sortedLevels[0].level).toBe(1);
    expect(sortedLevels[1].level).toBe(2);
    expect(sortedLevels[2].level).toBe(3);
  });

  it('should get experience required to next level', () => {
    const mockLevelInfoArray: UserTrackLevelInfo[] = [
      { level: 1, userClaimableRewards: [], description: '', status: LEVEL_STATUS.locked, requiredPoints: 100 } as UserTrackLevelInfo,
      { level: 2, userClaimableRewards: [], description: '', status: LEVEL_STATUS.unlocked, requiredPoints: 200 } as UserTrackLevelInfo,
      { level: 3, userClaimableRewards: [], description: '', status: LEVEL_STATUS.claimed, requiredPoints: 300 } as UserTrackLevelInfo,
    ];

    const expToNextLevel = rewardsService['getExpToNextLevel'](mockLevelInfoArray, 1, 50);

    expect(expToNextLevel).toBe(50);
  });


  it('should sort by time', () => {
    const mockActivityInfos: UserFulfillmentActivityInfo[] = [
      { receivedTime: new Date('2023-09-15T12:00:00Z') } as UserFulfillmentActivityInfo,
      { receivedTime: new Date('2023-09-15T11:00:00Z') } as UserFulfillmentActivityInfo,
      { receivedTime: new Date('2023-09-15T13:00:00Z') } as UserFulfillmentActivityInfo,
    ];

    const sortedActivityInfos = rewardsService['sortByTime'](mockActivityInfos);

    expect(sortedActivityInfos.length).toBe(3);
    expect(sortedActivityInfos[0].receivedTime).toBe(mockActivityInfos[0].receivedTime);
    expect(sortedActivityInfos[1].receivedTime).toBe(mockActivityInfos[1].receivedTime);
    expect(sortedActivityInfos[2].receivedTime).toBe(mockActivityInfos[2].receivedTime);
  });


});
