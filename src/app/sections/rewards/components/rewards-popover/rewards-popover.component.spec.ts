import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RewardsService } from '@sections/rewards/services';
import { RewardsPopoverComponent } from './rewards-popover.component';
import { PopupTypes } from '@sections/rewards/rewards.config';
import { RedeemableRewardInfo } from '@sections/rewards/models';
import { de } from 'date-fns/locale';

describe('RewardsPopoverComponent', () => {
  let component: RewardsPopoverComponent;
  let fixture: ComponentFixture<RewardsPopoverComponent>;
  const data: RedeemableRewardInfo = {
    id: '10',
    name: 'Jon Doe',
    shortDescription: 'Jon Doe name',
    description: 'Jon Doe name',
    pointCost: 10,
    claimStatus: 2,
    startDate: undefined,
    endDate: undefined,
    trackId: '',
    userId: '',
    rewardLevel: 0,
    status: 0,
    claimedTime: undefined,
    receivedTime: undefined,
    rewardClass: 0,
    pointsSpent: 0,
    itemName: '',
    rewardId: '',
    claimLevel: 0,
  };
  beforeEach(() => {
    const rewardsServiceStub = () => ({
      getContentValueByName: levelLabel => ({}),
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [RewardsPopoverComponent],
      providers: [{ provide: RewardsService, useFactory: rewardsServiceStub }],
    });
    fixture = TestBed.createComponent(RewardsPopoverComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it('should return scan', () => {
    component.type = PopupTypes.SCAN;
    expect(component.scan).toBe(true);
  });
  it('should return claim', () => {
    component.type = PopupTypes.CLAIM;
    expect(component.claim).toBe(true);
  });
  it('should return redeem', () => {
    component.type = PopupTypes.REDEEM;
    expect(component.redeem).toBe(true);
  });
  it('should return success', () => {
    component.type = PopupTypes.SUCCESS;
    expect(component.success).toBe(true);
  });
  it('should return optIn', () => {
    component.type = PopupTypes.OPT_IN;
    expect(component.optIn).toBe(true);
  });
  it('should call initContentStrings', () => {
    component['initContentStrings']();
    expect(component.contentString).toBeDefined();
  });
  describe('ngOnInit', () => {
    it('should set the expected values to popoverConfig', () => {
      component.data = data;
      component.type = PopupTypes.CLAIM;
      component.ngOnInit();
      expect(component.popoverConfig).toBeDefined();
    });
  });
  // describe('ngAfterViewInit', () => {
  //   it('should call initBarcode', () => {
  //     component.type = PopupTypes.SCAN;
  //     component.data = data;
  //     component.ngOnInit();
  //     component.ngAfterViewInit();
  //     expect(component['initBarcode']).toHaveBeenCalled();
  //   });
  // });
});
