import { TestBed } from '@angular/core/testing';
import { RewardsApiService } from './rewards-api.service';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { RewardsService } from './rewards.service';

describe('RewardsService', () => {
  let service: RewardsService;

  beforeEach(() => {
    const rewardsApiServiceStub = () => ({
      getUserRewardTrackInfo: showToastOnError => ({ pipe: () => ({}) }),
      getUserRewardHistoryInfo: showToastOnError => ({ pipe: () => ({}) })
    });
    const contentStringsFacadeServiceStub = () => ({
      retrieveContentStringListByRequest: contentStringsParams => ({})
    });
    TestBed.configureTestingModule({
      providers: [
        RewardsService,
        { provide: RewardsApiService, useFactory: rewardsApiServiceStub },
        {
          provide: ContentStringsFacadeService,
          useFactory: contentStringsFacadeServiceStub
        }
      ]
    });
    service = TestBed.inject(RewardsService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('getHistoryListRewards', () => {
    it('makes expected calls', () => {
      spyOn(component, 'combineAllRewards').and.callThrough();
      service.getHistoryListRewards();
      expect(service.combineAllRewards).toHaveBeenCalled();
    });
  });

  describe('getRewardsTabsConfig', () => {
    it('makes expected calls', () => {
      spyOn(component, 'getContentValueByName').and.callThrough();
      service.getRewardsTabsConfig();
      expect(service.getContentValueByName).toHaveBeenCalled();
    });
  });

  describe('initContentStringsList', () => {
    it('makes expected calls', () => {
      const contentStringsFacadeServiceStub: ContentStringsFacadeService = TestBed.inject(
        ContentStringsFacadeService
      );
      spyOn(
        contentStringsFacadeServiceStub,
        'retrieveContentStringListByRequest'
      ).and.callThrough();
      service.initContentStringsList();
      expect(
        contentStringsFacadeServiceStub.retrieveContentStringListByRequest
      ).toHaveBeenCalled();
    });
  });
});
