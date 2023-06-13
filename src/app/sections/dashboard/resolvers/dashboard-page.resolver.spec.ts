import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AccountService } from '@sections/accounts/services/accounts.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { TileConfigFacadeService } from '@sections/dashboard/tile-config-facade.service';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { MobileCredentialFacade } from '@shared/ui-components/mobile-credentials/service/mobile-credential-facade.service';
import { ProminentDisclosureService } from '../services/prominent-disclosure.service';
import { DashboardPageResolver } from './dashboard-page.resolver';

describe('DashboardPageResolver', () => {
  let service: DashboardPageResolver;

  beforeEach(() => {
    const accountServiceStub = () => ({ initContentStringsList: () => ({}) });
    const loadingServiceStub = () => ({
      showSpinner: () => ({}),
      closeSpinner: () => ({})
    });
    const tileConfigFacadeServiceStub = () => ({
      updateTilesConfigBySystemSettings: () => ({ pipe: () => ({}) })
    });
    const contentStringsFacadeServiceStub = () => ({
      fetchContentString$: (patronUi, mealDonation, dashboardTitle) => ({})
    });
    const institutionFacadeServiceStub = () => ({
      fetchInstitutionData: () => ({})
    });
    const settingsFacadeServiceStub = () => ({
      fetchSettingList: fEATURES => ({})
    });
    const userFacadeServiceStub = () => ({ getUser$: () => ({}) });
    const mobileCredentialFacadeStub = () => ({
      mobileCredentialEnabled$: () => ({ pipe: () => ({}) })
    });
    const prominentDisclosureServiceStub = () => ({
      openProminentDisclosure: () => ({})
    });
    TestBed.configureTestingModule({
      providers: [
        DashboardPageResolver,
        { provide: AccountService, useFactory: accountServiceStub },
        { provide: LoadingService, useFactory: loadingServiceStub },
        {
          provide: TileConfigFacadeService,
          useFactory: tileConfigFacadeServiceStub
        },
        {
          provide: ContentStringsFacadeService,
          useFactory: contentStringsFacadeServiceStub
        },
        {
          provide: InstitutionFacadeService,
          useFactory: institutionFacadeServiceStub
        },
        {
          provide: SettingsFacadeService,
          useFactory: settingsFacadeServiceStub
        },
        { provide: UserFacadeService, useFactory: userFacadeServiceStub },
        {
          provide: MobileCredentialFacade,
          useFactory: mobileCredentialFacadeStub
        },
        {
          provide: ProminentDisclosureService,
          useFactory: prominentDisclosureServiceStub
        }
      ]
    });
    service = TestBed.inject(DashboardPageResolver);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('resolve', () => {
    it('makes expected calls', () => {
      const activatedRouteSnapshotStub: ActivatedRouteSnapshot = <any>{};
      const loadingServiceStub: LoadingService = TestBed.inject(LoadingService);
      const prominentDisclosureServiceStub: ProminentDisclosureService = TestBed.inject(
        ProminentDisclosureService
      );
      spyOn(loadingServiceStub, 'showSpinner').and.callThrough();
      spyOn(loadingServiceStub, 'closeSpinner').and.callThrough();
      spyOn(
        prominentDisclosureServiceStub,
        'openProminentDisclosure'
      ).and.callThrough();
      service.resolve(activatedRouteSnapshotStub);
      expect(loadingServiceStub.showSpinner).toHaveBeenCalled();
      expect(loadingServiceStub.closeSpinner).toHaveBeenCalled();
      expect(
        prominentDisclosureServiceStub.openProminentDisclosure
      ).toHaveBeenCalled();
    });
  });
});
