import { TestBed } from '@angular/core/testing';
import { DashboardService } from '@sections/dashboard/services';
import { StorageStateService } from '@core/states/storage/storage-state.service';
import { ProfileServiceFacade } from '@shared/services/app.profile.services';
import { TileConfigFacadeService } from './tile-config-facade.service';
import { firstValueFrom } from 'rxjs';

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
     jest.spyOn(storageStateServiceStub, 'isKeyExistInState');
      service.isTileConfigInStorage();
      expect(storageStateServiceStub.isKeyExistInState).toHaveBeenCalled();
    });
  });
});
