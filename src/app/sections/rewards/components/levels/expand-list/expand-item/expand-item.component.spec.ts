import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { ClaimableRewardInfo, UserTrackLevelInfo } from '../../../../models';
import { ExpandItemComponent } from './expand-item.component';
import { LEVEL_STATUS } from '@sections/rewards/rewards.config';

export let claimableRewardInfo: ClaimableRewardInfo = {
  id: '10',
  startDate: new Date('2021-01-01T00:00:00Z'),
  endDate: new Date('2021-01-01T00:00:00Z'),
  name: 'Jon Doe',
  shortDescription: 'Jon Doe name',
  description: 'Jon Doe name',
  claimLevel: 2,
  claimStatus: 2,
};

export let levelInfo: UserTrackLevelInfo = {
  level: 10,
  name: '',
  requiredPoints: 0,
  redeemed: false,
  userClaimableRewards: [claimableRewardInfo],
  status: LEVEL_STATUS.claimed,
};
describe('ExpandItemComponent', () => {
  let component: ExpandItemComponent;
  let fixture: ComponentFixture<ExpandItemComponent>;
  const baseClass = 'progress__level';

  beforeEach(() => {
    const changeDetectorRefStub = () => ({ detectChanges: () => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ExpandItemComponent],
      providers: [{ provide: ChangeDetectorRef, useFactory: changeDetectorRefStub }],
    });
    fixture = TestBed.createComponent(ExpandItemComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`show has default value`, () => {
    expect(component.show).toEqual(false);
  });
  it('trackFn result', () => {
    const id = '10';
    expect(component['trackFn'](claimableRewardInfo)).toEqual(id);
  });
  it('onExpandHandler', () => {
    component['levelInfo'] = levelInfo;
    component['onExpandHandle']();
    expect(component.show).toEqual(true);
  });
  it('closeExpand', () => {
    component.show = true;
    component['levelInfo'] = levelInfo;
    component['closeExpand']();
    expect(component.show).toEqual(false);
  });
  it('isLockedItem', () => {
    expect(component['isLockedItem'](claimableRewardInfo)).toEqual(false);
  });
  it('getModifier claimed', () => {
    component['levelInfo'] = levelInfo;
    component['currentLevel'] = 12;
    expect(component['getModifier'](baseClass)).toEqual(`${baseClass}--claimed progress__level--scan`);
  });
  it('getModifier empty', () => {
    component['levelInfo'] = levelInfo;
    component['currentLevel'] = 9;
    levelInfo.redeemed = true;
    expect(component['getModifier'](baseClass)).toEqual('');
  });

  it('levelClass', () => {
    component['levelInfo'] = levelInfo;
    component['currentLevel'] = 10;
    expect(component.levelClass).toEqual(
      'progress__level progress__level--claimed progress__level--scan progress__level--current'
    );
  });
  it('hasRewards', () => {
    component['levelInfo'] = levelInfo;
    expect(component.hasRewards).toEqual(true);
  });
  it('isCurrentLvl', () => {
    component['levelInfo'] = levelInfo;
    component['currentLevel'] = 10;
    expect(component['isCurrentLvl']).toEqual(true);
  });
  it('hasLevelReceivedReward', () => {
    component['levelInfo'] = levelInfo;
    expect(component['hasLevelReceivedReward']).toEqual(false);
  });
  it('should icon qr', () => {
    component['levelInfo'] = levelInfo;
    expect(component.icon).toEqual('/assets/icon/qr-code-blue.svg');
  });
  it('should icon gift', () => {
    levelInfo.status = LEVEL_STATUS.received;
    component['levelInfo'] = levelInfo;
    expect(component.icon).toEqual('/assets/icon/gift-white.svg');
  });

  it('getModifier activeGift', () => {
    component['levelInfo'] = levelInfo;
    component['currentLevel'] = 10;
    expect(component['getModifier'](baseClass)).toEqual('progress__level--passed');
  });
  it('getModifier giftGotten', () => {
    levelInfo.status = LEVEL_STATUS.received;
    component['levelInfo'] = levelInfo;
    component['currentLevel'] = 10;
    expect(component['getModifier'](baseClass)).toEqual('progress__level--passed');
  });
  it('getModifier claimed', () => {
    levelInfo.status = LEVEL_STATUS.claimed;
    component['levelInfo'] = levelInfo;
    component['currentLevel'] = 10;
    expect(component['getModifier'](baseClass)).toEqual('progress__level--claimed progress__level--scan');
  });
  it('getModifier claimed', () => {
    levelInfo.status = LEVEL_STATUS.unlocked;
    component['levelInfo'] = levelInfo;
    component['currentLevel'] = 10;
    expect(component['getModifier'](baseClass)).toEqual('progress__level--active');
  });


  /*
  Add coverage to this method:
    isUnearnedItem(reward): boolean {
    return reward.claimStatus === CLAIM_STATUS.unearned && this.levelInfo.status !== LEVEL_STATUS.unlocked;
  }
  */
  it('should isUnearnedItem be true', () => {
    levelInfo.status = LEVEL_STATUS.locked;
    component['levelInfo'] = levelInfo;
    claimableRewardInfo.claimStatus = 0;
    expect(component['isUnearnedItem'](claimableRewardInfo)).toEqual(true);
  });
  it('should isUnearnedItem be false', () => {
    levelInfo.status = LEVEL_STATUS.unlocked;
    component['levelInfo'] = levelInfo;
    expect(component['isUnearnedItem'](claimableRewardInfo)).toEqual(false);
  });

  
});
