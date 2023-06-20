import { TestBed } from '@angular/core/testing';
import { RetryHandler } from '@shared/ui-components/no-connectivity-screen/model/connectivity-page.model';
import { ConnectionService } from './connection-service';
import { LoadingService } from '@core/service/loading/loading.service';
import { ModalController } from '@ionic/angular';
import { CommonService } from './common.service';
import { NavigationService } from './navigation.service';
import { ConnectionFacadeService } from './connection-facade.service';

describe('ConnectionFacadeService', () => {
  let service: ConnectionFacadeService;

  beforeEach(() => {
    const connectionServiceStub = () => ({
      isConnectionIssues: error => ({}),
      modalRefreshHandle: { next: () => ({}) },
      retrySubject: { next: () => ({}) },
      deviceOffline: () => ({})
    });
    const loadingServiceStub = () => ({
      showSpinner: () => ({}),
      closeSpinner: () => ({})
    });
    const modalControllerStub = () => ({
      getTop: () => ({ componentProps: { retryHandler: {} } }),
      create: object => ({
        present: () => ({}),
        onDidDismiss: () => ({ finally: () => ({}) })
      })
    });
    const commonServiceStub = () => ({
      loadContentString: noConnectivity => ({})
    });
    const navigationServiceStub = () => ({
      isRoute: noConnectivity => ({}),
      getUrl: () => ({}),
      navigateAnonymous: (noConnectivity, object) => ({ then: () => ({}) })
    });
    TestBed.configureTestingModule({
      providers: [
        ConnectionFacadeService,
        { provide: ConnectionService, useFactory: connectionServiceStub },
        { provide: LoadingService, useFactory: loadingServiceStub },
        { provide: ModalController, useFactory: modalControllerStub },
        { provide: CommonService, useFactory: commonServiceStub },
        { provide: NavigationService, useFactory: navigationServiceStub }
      ]
    });
    service = TestBed.inject(ConnectionFacadeService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
