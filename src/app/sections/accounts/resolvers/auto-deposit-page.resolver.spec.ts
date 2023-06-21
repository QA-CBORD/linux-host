import { TestBed } from '@angular/core/testing';
import { LoadingService } from '@core/service/loading/loading.service';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { AutoDepositPageResolver } from './auto-deposit-page.resolver';

describe('AutoDepositPageResolver', () => {
  let service: AutoDepositPageResolver;

  beforeEach(() => {
    const loadingServiceStub = () => ({
      showSpinner: () => ({}),
      closeSpinner: { bind: () => ({}) }
    });
    const settingsFacadeServiceStub = () => ({
      getSettings: requiredSettings => ({ pipe: () => ({}) })
    });
    TestBed.configureTestingModule({
      providers: [
        AutoDepositPageResolver,
        { provide: LoadingService, useFactory: loadingServiceStub },
        {
          provide: SettingsFacadeService,
          useFactory: settingsFacadeServiceStub
        }
      ]
    });
    service = TestBed.inject(AutoDepositPageResolver);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('resolve', () => {
    it('makes expected calls', () => {
      const loadingServiceStub: LoadingService = TestBed.inject(LoadingService);
      const settingsFacadeServiceStub: SettingsFacadeService = TestBed.inject(
        SettingsFacadeService
      );
     jest.spyOn(loadingServiceStub, 'showSpinner');
     jest.spyOn(settingsFacadeServiceStub, 'getSettings');
      service.resolve();
      expect(loadingServiceStub.showSpinner).toHaveBeenCalled();
      expect(settingsFacadeServiceStub.getSettings).toHaveBeenCalled();
    });
  });
});
