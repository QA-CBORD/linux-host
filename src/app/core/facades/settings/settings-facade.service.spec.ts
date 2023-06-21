import { TestBed } from '@angular/core/testing';
import { SettingsStateService } from '@core/states/settings/settings-state.service';
import { SettingsApiService } from '@core/service/settings-api-service/settings-api.service';
import { UserSettingsStateService } from '@core/states/user-settings/user-settings-state.service';
import { SettingsFacadeService } from './settings-facade.service';

describe('SettingsFacadeService', () => {
  let service: SettingsFacadeService;

  beforeEach(() => {
    const settingsStateServiceStub = () => ({
      state$: {},
      getSetting: setting => ({ pipe: () => ({}) }),
      updateState: sett => ({}),
      clearState: () => ({})
    });
    const settingsApiServiceStub = () => ({
      getSetting: (setting, sessionId, institutionId) => ({}),
      getSettings: (setting, sessionId, institutionId) => ({}),
      getSettingList: (settings, sessionId, institutionId) => ({}),
      getUserSetting: setting => ({}),
      deleteUserSetting: setting => ({}),
      saveUserSetting: (setting, value) => ({})
    });
    const userSettingsStateServiceStub = () => ({
      getSetting: setting => ({ pipe: () => ({}) }),
      updateState: sett => ({}),
      removeSetting: setting => ({})
    });
    TestBed.configureTestingModule({
      providers: [
        SettingsFacadeService,
        { provide: SettingsStateService, useFactory: settingsStateServiceStub },
        { provide: SettingsApiService, useFactory: settingsApiServiceStub },
        {
          provide: UserSettingsStateService,
          useFactory: userSettingsStateServiceStub
        }
      ]
    });
    service = TestBed.inject(SettingsFacadeService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('cleanCache', () => {
    it('makes expected calls', () => {
      const settingsStateServiceStub: SettingsStateService = TestBed.inject(
        SettingsStateService
      );
     jest.spyOn(settingsStateServiceStub, 'clearState');
      service.cleanCache();
      expect(settingsStateServiceStub.clearState).toHaveBeenCalled();
    });
  });
});
