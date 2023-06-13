import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RewardsService } from './services/rewards.service';
import { RewardsTileComponent } from './rewards-tile.component';

describe('RewardsTileComponent', () => {
  let component: RewardsTileComponent;
  let fixture: ComponentFixture<RewardsTileComponent>;

  beforeEach(() => {
    const rewardsServiceStub = () => ({ rewardTrack$: {} });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [RewardsTileComponent],
      providers: [{ provide: RewardsService, useFactory: rewardsServiceStub }]
    });
    fixture = TestBed.createComponent(RewardsTileComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`isLoadingData has default value`, () => {
    expect(component.isLoadingData).toEqual(true);
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'initUserRewardTrackInfo').and.callThrough();
      component.ngOnInit();
      expect(component.initUserRewardTrackInfo).toHaveBeenCalled();
    });
  });
});
