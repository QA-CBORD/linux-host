import { TestBed } from '@angular/core/testing';
import { first, lastValueFrom } from 'rxjs';
import { RewardsApiService } from 'src/app/core/service/rewards/rewards-api.service';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { RewardsService } from './rewards.service';
import { OPT_IN_STATUS } from 'src/app/core/model/rewards/rewards.model';
import {
  MockRewardsApiService,
  USER_REWARD_TRACKINFO_LIST_MOCK,
} from 'src/app/testing/mock-services/mock-rewards-api.service';

describe('RewardsService', () => {
  let rewardsService: RewardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RewardsService,
        {
          provide: RewardsApiService,
          useClass: MockRewardsApiService,
        },
        {
          provide: SettingsFacadeService,
          useValue: { getSetting: jest.fn() },
        },
      ],
    });
    rewardsService = TestBed.inject(RewardsService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should create', () => {
    expect(rewardsService).toBeTruthy();
  });

  describe('getUserRewardTrackInfo', () => {
    it('should call rewardsApi.getUserRewardTrackInfo and update the reward track', async () => {
      await lastValueFrom(rewardsService.getUserRewardTrackInfo());
      let result = await lastValueFrom(rewardsService.rewardTrack$.pipe(first()));
      expect(result).toEqual(USER_REWARD_TRACKINFO_LIST_MOCK[0]);
    });
  });

  describe('getUserOptInStatus', () => {
    it('should return the userOptInStatus from the reward track', async () => {
      await lastValueFrom(rewardsService.getUserRewardTrackInfo());
      let result: OPT_IN_STATUS = await lastValueFrom(rewardsService.getUserOptInStatus().pipe(first()));
      expect(result).toEqual(OPT_IN_STATUS.yes);
    });
  });
});
