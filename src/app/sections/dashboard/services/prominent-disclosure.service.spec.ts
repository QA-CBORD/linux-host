import { TestBed } from '@angular/core/testing';
import { NativeStartupFacadeService } from '@core/facades/native-startup/native-startup.facade.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { ModalController } from '@ionic/angular';
import { CommonService } from '@shared/services/common.service';
import { NavigationFacadeSettingsService } from '@shared/ui-components/st-global-navigation/services/navigation-facade-settings.service';
import { ProminentDisclosureService } from './prominent-disclosure.service';

describe('ProminentDisclosureService', () => {
  let service: ProminentDisclosureService;

  beforeEach(() => {
    const nativeStartupFacadeServiceStub = () => ({
      blockGlobalNavigationStatus: {}
    });
    const loadingServiceStub = () => ({ closeSpinner: () => ({}) });
    const modalControllerStub = () => ({
      create: object => ({
        present: () => ({}),
        onDidDismiss: () => ({ then: () => ({}) })
      })
    });
    const commonServiceStub = () => ({
      loadContentString: locationDisclosure => ({ pipe: () => ({}) })
    });
    const navigationFacadeSettingsServiceStub = () => ({
      permissionsPrompted$: { pipe: () => ({ subscribe: f => f({}) }) }
    });
    TestBed.configureTestingModule({
      providers: [
        ProminentDisclosureService,
        {
          provide: NativeStartupFacadeService,
          useFactory: nativeStartupFacadeServiceStub
        },
        { provide: LoadingService, useFactory: loadingServiceStub },
        { provide: ModalController, useFactory: modalControllerStub },
        { provide: CommonService, useFactory: commonServiceStub },
        {
          provide: NavigationFacadeSettingsService,
          useFactory: navigationFacadeSettingsServiceStub
        }
      ]
    });
    service = TestBed.inject(ProminentDisclosureService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
