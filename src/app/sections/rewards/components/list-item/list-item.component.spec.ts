import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { RedeemableRewardInfo } from '@sections/rewards/models';
import { RewardsApiService } from '@sections/rewards/services';
import { RewardsService } from '@sections/rewards/services';
import { LoadingService } from '@core/service/loading/loading.service';
import { PopupTypes } from '@sections/rewards/rewards.config';
import { ListItemComponent } from './list-item.component';

describe('ListItemComponent', () => {
  let component: ListItemComponent;
  let fixture: ComponentFixture<ListItemComponent>;

  beforeEach(() => {
    const popoverControllerStub = () => ({
      create: object => ({
        onDidDismiss: () => ({ then: () => ({}) }),
        present: () => ({})
      })
    });
    const rewardsApiServiceStub = () => ({
      claimReward: id => ({ pipe: () => ({ subscribe: f => f({}) }) })
    });
    const rewardsServiceStub = () => ({
      extractFromHistoryByRewardId: id => ({ id: {} }),
      getAllData: () => ({ pipe: () => ({ subscribe: f => f({}) }) }),
      getContentValueByName: levelLabel => ({})
    });
    const loadingServiceStub = () => ({
      showSpinner: () => ({}),
      closeSpinner: () => ({})
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ListItemComponent],
      providers: [
        { provide: PopoverController, useFactory: popoverControllerStub },
        { provide: RewardsApiService, useFactory: rewardsApiServiceStub },
        { provide: RewardsService, useFactory: rewardsServiceStub },
        { provide: LoadingService, useFactory: loadingServiceStub }
      ]
    });
    fixture = TestBed.createComponent(ListItemComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('openPopover', () => {
    it('makes expected calls', () => {
      const popoverControllerStub: PopoverController = fixture.debugElement.injector.get(
        PopoverController
      );
      const redeemableRewardInfoStub: RedeemableRewardInfo = <any>{};
      const rewardsServiceStub: RewardsService = fixture.debugElement.injector.get(
        RewardsService
      );
      const popupTypesStub: PopupTypes = <any>{};
      spyOn(popoverControllerStub, 'create').and.callThrough();
      spyOn(
        rewardsServiceStub,
        'extractFromHistoryByRewardId'
      ).and.callThrough();
      component.openPopover(redeemableRewardInfoStub, popupTypesStub);
      expect(popoverControllerStub.create).toHaveBeenCalled();
      expect(
        rewardsServiceStub.extractFromHistoryByRewardId
      ).toHaveBeenCalled();
    });
  });
});
