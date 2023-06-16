import { TestBed } from '@angular/core/testing';
import { PopoverController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { LoadingService } from '../../../core/service/loading/loading.service';
import { RewardsService } from '../services';
import { RewardsResolverGuard } from './rewards.resolver.guard';

describe('RewardsResolverGuard', () => {
  let service: RewardsResolverGuard;

  beforeEach(() => {
    const popoverControllerStub = () => ({
      create: object => ({
        onDidDismiss: () => ({ then: () => ({}) }),
        present: () => ({})
      })
    });
    const loadingServiceStub = () => ({
      showSpinner: () => ({}),
      closeSpinner: () => ({})
    });
    const rewardsServiceStub = () => ({
      getAllData: arg => ({ pipe: () => ({}) })
    });
    TestBed.configureTestingModule({
      providers: [
        RewardsResolverGuard,
        { provide: PopoverController, useFactory: popoverControllerStub },
        { provide: LoadingService, useFactory: loadingServiceStub },
        { provide: RewardsService, useFactory: rewardsServiceStub }
      ]
    });
    service = TestBed.inject(RewardsResolverGuard);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('modalHandler', () => {
    it('makes expected calls', () => {
      const popoverControllerStub: PopoverController = TestBed.inject(
        PopoverController
      );
      const subjectStub: Subject<any> = <any>{};
      const loadingServiceStub: LoadingService = TestBed.inject(LoadingService);
     jest.spyOn(popoverControllerStub, 'create');
     jest.spyOn(loadingServiceStub, 'showSpinner');
      service.modalHandler(subjectStub);
      expect(popoverControllerStub.create).toHaveBeenCalled();
      expect(loadingServiceStub.showSpinner).toHaveBeenCalled();
    });
  });
});
