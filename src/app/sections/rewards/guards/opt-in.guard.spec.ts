import { TestBed } from '@angular/core/testing';
import { PopoverController } from '@ionic/angular';
import { RewardsApiService } from '../services';
import { RewardsService } from '../services';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { ToastService } from '@core/service/toast/toast.service';
import { OptInGuard } from './opt-in.guard';

describe('OptInGuard', () => {
  let service: OptInGuard;

  beforeEach(() => {
    const popoverControllerStub = () => ({
      create: object => ({
        onDidDismiss: () => ({ then: () => ({}) }),
        present: () => ({})
      })
    });
    const rewardsApiServiceStub = () => ({
      optUserIntoRewardTrack: (trackID, id) => ({})
    });
    const rewardsServiceStub = () => ({
      initContentStringsList: () => ({ pipe: () => ({}) }),
      getUserRewardTrackInfo: () => ({}),
      getContentValueByName: optInToast => ({})
    });
    const userFacadeServiceStub = () => ({ getUserData$: () => ({}) });
    const toastServiceStub = () => ({ showToast: object => ({}) });
    TestBed.configureTestingModule({
      providers: [
        OptInGuard,
        { provide: PopoverController, useFactory: popoverControllerStub },
        { provide: RewardsApiService, useFactory: rewardsApiServiceStub },
        { provide: RewardsService, useFactory: rewardsServiceStub },
        { provide: UserFacadeService, useFactory: userFacadeServiceStub },
        { provide: ToastService, useFactory: toastServiceStub }
      ]
    });
    service = TestBed.inject(OptInGuard);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('canActivate', () => {
    it('makes expected calls', () => {
      const rewardsServiceStub: RewardsService = TestBed.inject(RewardsService);
      spyOn(rewardsServiceStub, 'initContentStringsList').and.callThrough();
      spyOn(rewardsServiceStub, 'getUserRewardTrackInfo').and.callThrough();
      service.canActivate();
      expect(rewardsServiceStub.initContentStringsList).toHaveBeenCalled();
      expect(rewardsServiceStub.getUserRewardTrackInfo).toHaveBeenCalled();
    });
  });
});
