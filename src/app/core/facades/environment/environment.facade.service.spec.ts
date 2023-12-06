import { TestBed } from '@angular/core/testing';

import { ENVIRONMENTS_MAP, EnvironmentType } from '@core/model/environment';
import { firstValueFrom, of } from 'rxjs';

import { AuthFacadeService } from '../auth/auth.facade.service';
import { MockAuthService } from 'src/app/testing/mock-services';
import { EnvironmentFacadeService } from './environment.facade.service';
import { CoreTestingModules } from 'src/app/testing/core-modules';
import { CoreProviders } from 'src/app/testing/core-providers';
import { StorageStateService } from '@core/states/storage/storage-state.service';

describe('EnvironmentFacadeService', () => {
  let service: EnvironmentFacadeService;
  const mockStorageStateService = {
    getStateEntityByKey$: jest.fn().mockReturnValue(of(null)),
    updateStateEntity: jest.fn(),
    deleteStateEntityByKey: jest.fn()
  };
  beforeEach(() => {
    TestBed.overrideProvider(AuthFacadeService, { useValue: new MockAuthService() });

    TestBed.configureTestingModule({
      imports: [...CoreTestingModules],
      providers: [...CoreProviders, { provide: StorageStateService, useValue: mockStorageStateService }],
    });
    service = TestBed.inject(EnvironmentFacadeService);
  });

  it('Should have PROD environment by default', async () => {
    expect(service).toBeTruthy();
    await expect(firstValueFrom(service.getSavedEnvironmentInfo$())).resolves.toEqual(
      ENVIRONMENTS_MAP[EnvironmentType.production]
    );
  });

  it('Should override environments and revert to default', async () => {
    expect(service).toBeTruthy();
    service.overrideEnvironment(EnvironmentType.productionCanada);
    await expect(firstValueFrom(service.getSavedEnvironmentInfo$())).resolves.toEqual(
      ENVIRONMENTS_MAP[EnvironmentType.productionCanada]
    );

    await service.resetEnvironmentAndCreateSession();
    await expect(firstValueFrom(service.getSavedEnvironmentInfo$())).resolves.toEqual(
      ENVIRONMENTS_MAP[EnvironmentType.production]
    );
  });
});
