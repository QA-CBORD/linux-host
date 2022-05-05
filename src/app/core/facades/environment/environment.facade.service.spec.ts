import { TestBed } from '@angular/core/testing';

import { ENVIRONMENTS_MAP, EnvironmentType } from '@core/model/environment';
import { firstValueFrom } from '@shared/utils';

import { AuthFacadeService } from '../auth/auth.facade.service';
import { MockAuthService } from 'src/app/testing/mock-services';
import { EnvironmentFacadeService } from './environment.facade.service';
import { CoreTestingModules } from 'src/app/testing/core-modules';

describe('EnvironmentFacadeService', () => {
  let service: EnvironmentFacadeService;

  beforeEach(() => {
    TestBed.overrideProvider(AuthFacadeService, { useValue: new MockAuthService() });

    TestBed.configureTestingModule({
      imports: [...CoreTestingModules],
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
