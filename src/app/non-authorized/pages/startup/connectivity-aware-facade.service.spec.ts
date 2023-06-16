import { TestBed } from "@angular/core/testing";
import { LoadingService } from "@core/service/loading/loading.service";
import { ConnectionFacadeService } from "@shared/services/connection-facade.service";
import { RetryHandler } from "@shared/ui-components/no-connectivity-screen/model/connectivity-page.model";
import { NavigationService } from "@shared/services/navigation.service";
import { ConnectivityAwareFacadeService } from "./connectivity-aware-facade.service";

describe("ConnectivityAwareFacadeService", () => {
  let service: ConnectivityAwareFacadeService;

  beforeEach(() => {
    const loadingServiceStub = () => ({
      showSpinner: () => ({}),
      closeSpinner: () => ({})
    });
    const connectionFacadeServiceStub = () => ({
      isConnectionError: error => ({}),
      isModalOpened: () => ({}),
      setPinModalOpened: isOpened => ({}),
      handleConnectionError: (object, arg, isVaultLocked) => ({})
    });
    const navigationServiceStub = () => ({});
    TestBed.configureTestingModule({
      providers: [
        ConnectivityAwareFacadeService,
        { provide: LoadingService, useFactory: loadingServiceStub },
        {
          provide: ConnectionFacadeService,
          useFactory: connectionFacadeServiceStub
        },
        { provide: NavigationService, useFactory: navigationServiceStub }
      ]
    });
    service = TestBed.inject(ConnectivityAwareFacadeService);
  });

  it("can load instance", () => {
    expect(service).toBeTruthy();
  });

  describe("isModalOpened", () => {
    it("makes expected calls", () => {
      const connectionFacadeServiceStub: ConnectionFacadeService = TestBed.inject(
        ConnectionFacadeService
      );
     jest.spyOn(connectionFacadeServiceStub, "isModalOpened");
      service.isModalOpened();
      expect(connectionFacadeServiceStub.isModalOpened).toHaveBeenCalled();
    });
  });
});
