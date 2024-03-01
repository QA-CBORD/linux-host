import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { RedeemableRewardInfo } from '@sections/rewards/models';
import { RewardsApiService } from '@sections/rewards/services';
import { RewardsService } from '@sections/rewards/services';
import { LoadingService } from '@core/service/loading/loading.service';
import { CLAIM_STATUS, PopupTypes } from '@sections/rewards/rewards.config';
import { ListItemComponent } from './list-item.component';
import { BUTTON_TYPE } from '@core/utils/buttons.config';

describe('ListItemComponent', () => {
  let component: ListItemComponent;
  let fixture: ComponentFixture<ListItemComponent>;

  beforeEach(() => {
    const popoverControllerStub = () => ({
      create: object => ({
        onDidDismiss: () => ({ then: () => ({}) }),
        present: () => ({}),
      }),
    });
    const rewardsApiServiceStub = () => ({
      claimReward: id => ({ pipe: () => ({ subscribe: f => f({}) }) }),
    });
    const rewardsServiceStub = () => ({
      extractFromHistoryByRewardId: id => ({ id: {} }),
      getAllData: () => ({ pipe: () => ({ subscribe: f => f({}) }) }),
      getContentValueByName: levelLabel => ({}),
    });
    const loadingServiceStub = () => ({
      showSpinner: () => ({}),
      closeSpinner: () => ({}),
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ListItemComponent],
      providers: [
        { provide: PopoverController, useFactory: popoverControllerStub },
        { provide: RewardsApiService, useFactory: rewardsApiServiceStub },
        { provide: RewardsService, useFactory: rewardsServiceStub },
        { provide: LoadingService, useFactory: loadingServiceStub },
      ],
    });
    fixture = TestBed.createComponent(ListItemComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('when store reward is disabled', () => {
    component.currentPoints = 0;
    component.environment = 'store';
    component.item = { pointCost: 1 } as RedeemableRewardInfo;
    expect(component.disabledStoreReward).toBe(true);
  });
  it('when store reward is enabled', () => {
    component.currentPoints = 1;
    component.item = { pointCost: 0 } as RedeemableRewardInfo;
    expect(component.disabledStoreReward).toBe(false);
  });

  it('type is scan', () => {
    component.active = true;
    expect(component.type).toBe(PopupTypes.SCAN);
  });
  it('type is redeem', () => {
    component.active = false;
    expect(component.type).toBe(PopupTypes.REDEEM);
  });
  it('is history env', () => {
    component.environment = 'history';
    expect(component.isHistoryEnv).toBe(true);
  });
  it('is store env', () => {
    component.environment = 'store';
    expect(component.isStoreEnv).toBe(true);
  });
  it('is levels env', () => {
    component.environment = 'levels';
    expect(component.isLevelsEnv).toBe(true);
  });

  it('is claimed', () => {
    component.item = { claimStatus: CLAIM_STATUS.claimed } as RedeemableRewardInfo;
    expect(component.isClaimed).toBe(true);
  });
  it('is received', () => {
    component.item = { claimStatus: CLAIM_STATUS.received } as RedeemableRewardInfo;
    expect(component.isReceived).toBe(true);
  });
  it('is unearned', () => {
    component.item = { claimStatus: CLAIM_STATUS.unearned } as RedeemableRewardInfo;
    expect(component.isUnearned).toBe(true);
  });
  it('listItemScoreValue', () => {
    component.item = { rewardLevel: 1, pointsSpent: 1 } as RedeemableRewardInfo;
    expect(component.listItemScoreValue).toBeTruthy();
  });
  it('is lower then current level', () => {
    component.item = { claimLevel: 1 } as RedeemableRewardInfo;
    component.userLevel = 1;
    expect(component.isLowerThenCurrentLevel).toBe(true);
  });
  it('when popover is preventOpenPopover called when open popover', async () => {
    component['preventOpenPopover'] = jest.fn();
    await component.openPopover({ id: '1' } as RedeemableRewardInfo, PopupTypes.REDEEM);
    expect(component['preventOpenPopover']).toHaveBeenCalled();
  });
  it('when popover is dissmised by onDismissPopoverHandler', async () => {
    component['onDismissPopoverHandler'] = jest.fn();
    await component['onDismissPopoverHandler'](BUTTON_TYPE.CLAIM, PopupTypes.CLAIM);
    expect(component['onDismissPopoverHandler']).toHaveBeenCalled();
  });
  it('when data is refreshed', () => {
    const rewardsServiceStub: RewardsService = fixture.debugElement.injector.get(RewardsService);
    jest.spyOn(rewardsServiceStub, 'getAllData');
    component['refreshData']();
    expect(rewardsServiceStub.getAllData).toHaveBeenCalled();
  });
  it('obtain default popover action', () => {
    component.environment = 'levels';
    expect(component['defaultPopoverAction'](CLAIM_STATUS.unearned)).toBe(PopupTypes.CLAIM);
  })
});
