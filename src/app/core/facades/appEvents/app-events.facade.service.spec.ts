import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from '@shared/utils';
import { MockAppEventsService } from 'src/app/testing/mock-services';
import { AppStatesFacadeService } from './app-events.facade.service';
import { CoreTestingModules } from 'src/app/testing/core-modules';

describe('AppStatesFacadeService', () => {
  let service: AppStatesFacadeService;
  const mock = new MockAppEventsService();

  beforeEach(() => {
    TestBed.overrideProvider(AppStatesFacadeService, { useValue: new MockAppEventsService() });

    TestBed.configureTestingModule({
      imports: [...CoreTestingModules],
    });
    service = TestBed.inject(AppStatesFacadeService);
  });

  it('Should getStateChangeEvent emit a valid first emission', async () => {
    expect(service).toBeTruthy();
    await expect(firstValueFrom(service.getStateChangeEvent$)).resolves.toEqual(mock.state);
  });

  it('Should getAppUrlOpenEvent emit a valid first emission', async () => {
    expect(service).toBeTruthy();
    await expect(firstValueFrom(service.getAppUrlOpenEvent$)).resolves.toEqual(mock.urlOpen);
  });
});
