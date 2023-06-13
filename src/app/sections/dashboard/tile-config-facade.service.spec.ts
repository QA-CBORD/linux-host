import { TestBed } from '@angular/core/testing';
import { DashboardService } from '@sections/dashboard/services';
import { StorageStateService } from '@core/states/storage/storage-state.service';
import { ProfileServiceFacade } from '@shared/services/app.profile.services';
import { TileConfigFacadeService } from './tile-config-facade.service';

describe('TileConfigFacadeService', () => {
  let service: TileConfigFacadeService;

  beforeEach(() => {
    const dashboardServiceStub = () => ({
      retrieveSettingsList: () => ({}),
      getUpdatedTilesBaseConfig: settings => ({ filter: () => ({}) }),
      updateConfigByCashedConfig: (allowedConfigFromBE, config) => ({}),
      updateAccountTile: updatedConfig => ({})
    });
    const storageStateServiceStub = () => ({
      isKeyExistInState: key => ({}),
      updateStateEntity: (key, value, object) => ({})
    });
    const profileServiceFacadeStub = () => ({
      determineCurrentProfile: list => ({})
    });
    TestBed.configureTestingModule({
      providers: [
        TileConfigFacadeService,
        { provide: DashboardService, useFactory: dashboardServiceStub },
        { provide: StorageStateService, useFactory: storageStateServiceStub },
        { provide: ProfileServiceFacade, useFactory: profileServiceFacadeStub }
      ]
    });
    service = TestBed.inject(TileConfigFacadeService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('isTileConfigInStorage', () => {
    it('makes expected calls', () => {
      const storageStateServiceStub: StorageStateService = TestBed.inject(
        StorageStateService
      );
      spyOn(storageStateServiceStub, 'isKeyExistInState').and.callThrough();
      service.isTileConfigInStorage();
      expect(storageStateServiceStub.isKeyExistInState).toHaveBeenCalled();
    });
  });

  describe('updateTilesConfigBySystemSettings', () => {
    it('makes expected calls', () => {
      const dashboardServiceStub: DashboardService = TestBed.inject(
        DashboardService
      );
      const profileServiceFacadeStub: ProfileServiceFacade = TestBed.inject(
        ProfileServiceFacade
      );
      spyOn(component, 'isValidConfig').and.callThrough();
      spyOn(component, 'updateConfigState').and.callThrough();
      spyOn(dashboardServiceStub, 'retrieveSettingsList').and.callThrough();
      spyOn(
        dashboardServiceStub,
        'getUpdatedTilesBaseConfig'
      ).and.callThrough();
      spyOn(
        dashboardServiceStub,
        'updateConfigByCashedConfig'
      ).and.callThrough();
      spyOn(dashboardServiceStub, 'updateAccountTile').and.callThrough();
      spyOn(
        profileServiceFacadeStub,
        'determineCurrentProfile'
      ).and.callThrough();
      service.updateTilesConfigBySystemSettings();
      expect(service.isValidConfig).toHaveBeenCalled();
      expect(service.updateConfigState).toHaveBeenCalled();
      expect(dashboardServiceStub.retrieveSettingsList).toHaveBeenCalled();
      expect(dashboardServiceStub.getUpdatedTilesBaseConfig).toHaveBeenCalled();
      expect(
        dashboardServiceStub.updateConfigByCashedConfig
      ).toHaveBeenCalled();
      expect(dashboardServiceStub.updateAccountTile).toHaveBeenCalled();
      expect(
        profileServiceFacadeStub.determineCurrentProfile
      ).toHaveBeenCalled();
    });
  });
});
