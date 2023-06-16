import { TestBed } from '@angular/core/testing';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { GuestFacadeService } from './guest.facade.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { MessageProxy } from '@shared/services/injectable-message.proxy';
import { ProminentDisclosureService } from '@sections/dashboard/services/prominent-disclosure.service';
import { GuestDashboardResolver } from './guest-dashboard.resolver';

describe('GuestDashboardResolver', () => {
  let service: GuestDashboardResolver;

  beforeEach(() => {
    const userFacadeServiceStub = () => ({ getUserData$: () => ({}) });
    const guestFacadeServiceStub = () => ({
      configureGuestDashboard: () => ({ pipe: () => ({}) })
    });
    const loadingServiceStub = () => ({
      showSpinner: () => ({}),
      closeSpinner: () => ({})
    });
    const messageProxyStub = () => ({ put: dashboardSections => ({}) });
    const prominentDisclosureServiceStub = () => ({
      openProminentDisclosure: () => ({})
    });
    TestBed.configureTestingModule({
      providers: [
        GuestDashboardResolver,
        { provide: UserFacadeService, useFactory: userFacadeServiceStub },
        { provide: GuestFacadeService, useFactory: guestFacadeServiceStub },
        { provide: LoadingService, useFactory: loadingServiceStub },
        { provide: MessageProxy, useFactory: messageProxyStub },
        {
          provide: ProminentDisclosureService,
          useFactory: prominentDisclosureServiceStub
        }
      ]
    });
    service = TestBed.inject(GuestDashboardResolver);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('resolve', () => {
    it('makes expected calls', () => {
      const userFacadeServiceStub: UserFacadeService = TestBed.inject(
        UserFacadeService
      );
      const guestFacadeServiceStub: GuestFacadeService = TestBed.inject(
        GuestFacadeService
      );
      const loadingServiceStub: LoadingService = TestBed.inject(LoadingService);
      const messageProxyStub: MessageProxy = TestBed.inject(MessageProxy);
      const prominentDisclosureServiceStub: ProminentDisclosureService = TestBed.inject(
        ProminentDisclosureService
      );
     jest.spyOn(userFacadeServiceStub, 'getUserData$');
     jest.spyOn(
        guestFacadeServiceStub,
        'configureGuestDashboard'
      );
     jest.spyOn(loadingServiceStub, 'showSpinner');
     jest.spyOn(loadingServiceStub, 'closeSpinner');
     jest.spyOn(messageProxyStub, 'put');
     jest.spyOn(
        prominentDisclosureServiceStub,
        'openProminentDisclosure'
      );
      service.resolve();
      expect(userFacadeServiceStub.getUserData$).toHaveBeenCalled();
      expect(guestFacadeServiceStub.configureGuestDashboard).toHaveBeenCalled();
      expect(loadingServiceStub.showSpinner).toHaveBeenCalled();
      expect(loadingServiceStub.closeSpinner).toHaveBeenCalled();
      expect(messageProxyStub.put).toHaveBeenCalled();
      expect(
        prominentDisclosureServiceStub.openProminentDisclosure
      ).toHaveBeenCalled();
    });
  });
});
