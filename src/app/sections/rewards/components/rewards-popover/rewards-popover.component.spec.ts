import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RewardsService } from '@sections/rewards/services';
import { RewardsPopoverComponent } from './rewards-popover.component';
import { PopupTypes } from '@sections/rewards/rewards.config';
import { RedeemableRewardInfo } from '@sections/rewards/models';
import { buttons } from '@core/utils/buttons.config';
import { PopoverConfig } from '@core/model/popover/popover.model';
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
    component.contentString = {
      cancelButton: 'Cancel',
      redeemButton: 'Redeem',
      retryButton: 'Retry',
      optInBtn: 'Opt In',
      closeButton: 'Close',
      successTitle: 'Success',
      redeemTitle: 'Redeem Title',
      scanCodeTitle: 'Scan Code Title',
      retryTitle: 'Retry Title',
      scanCodeDescription: 'Scan Code Description',
    };
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
  it('should return data.id if type is scan', () => {
    expect(component['getCode'](PopupTypes.SCAN, data)).toBe(data.id);
  });
  it('should return empty string if type is success', () => {
    expect(component['getCode'](PopupTypes.SUCCESS, data)).toBe('');
  });

  describe('ngOnInit', () => {
    it('should set the expected values to popoverConfig', () => {
      component.data = data;
      component.type = PopupTypes.CLAIM;
      component.ngOnInit();
      expect(component.popoverConfig).toBeDefined();
    });
  });
  it('should return the correct title for PopupTypes.REDEEM', () => {
    const title = component['getTitle'](PopupTypes.REDEEM);
    expect(title).toBe(component.contentString.redeemTitle);
  });

  it('should return the correct title for PopupTypes.SCAN', () => {
    const title = component['getTitle'](PopupTypes.SCAN);
    expect(title).toBe(component.contentString.scanCodeTitle);
  });

  it('should return the correct title for PopupTypes.SUCCESS', () => {
    const title = component['getTitle'](PopupTypes.SUCCESS);
    expect(title).toBe(component.contentString.successTitle);
  });

  it('should return the correct title for PopupTypes.CLAIM', () => {
    const title = component['getTitle'](PopupTypes.CLAIM);
    expect(title).toBe(component.contentString.claimTitle);
  });

  it('should return the correct title for PopupTypes.RETRY', () => {
    const title = component['getTitle'](PopupTypes.RETRY);
    expect(title).toBe(component.contentString.retryTitle);
  });

  it('should return an empty string for unknown PopupTypes', () => {
    const title = component['getTitle']('UNKNOWN_TYPE');
    expect(title).toBe('');
  });
  it('should configure buttons for PopupTypes.REDEEM', () => {
    const button = component['configureButtons'](PopupTypes.REDEEM);
    expect(button).toEqual([
      { ...buttons.CANCEL, label: 'Cancel' },
      { ...buttons.REDEEM, label: 'Redeem' },
    ]);
  });

  it('should configure buttons for PopupTypes.RETRY', () => {
    const button = component['configureButtons'](PopupTypes.RETRY);
    expect(button).toEqual([{ ...buttons.RETRY, label: 'Retry' }]);
  });

  it('should configure buttons for PopupTypes.OPT_IN', () => {
    const button = component['configureButtons'](PopupTypes.OPT_IN);
    expect(button).toEqual([{ ...buttons.OPT_IN, label: 'Opt In' }]);
  });

  it('should configure buttons for default case', () => {
    const button = component['configureButtons']('UNKNOWN_TYPE');
    expect(button).toEqual([{ ...buttons.CLOSE, label: 'Close' }]);
  });

  it('should have default null values on getName', () => {
    const name = component['getMessage']({} as RedeemableRewardInfo);
    expect(name).toEqual({ title: null, description: undefined });
  });
  
  describe('ngAfterViewInit', () => {
    it('should not call initBarcode when type is not PopupTypes.SCAN', () => {
      component.type = PopupTypes.REDEEM;
      const initBarcodeSpy = jest.spyOn(component as any, 'initBarcode');
      component.ngAfterViewInit();
      expect(initBarcodeSpy).not.toHaveBeenCalled();
    });
  });
});
