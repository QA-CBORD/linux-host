import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of } from 'rxjs';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { ProfileServiceFacade } from './app.profile.services';
import { SettingInfo } from '@core/model/configuration/setting-info.model';
import { APP_PROFILES } from '@sections/dashboard/models';

describe(ProfileServiceFacade, () => {
  let service: ProfileServiceFacade;
  let _settingsFacadeService, _authFacadeService;

  const mockProfile = {
    category: '',
    contentMediaType: 1,
    description: '',
    domain: '',
    id: '',
    name: 'enable_housing_only',
    value: '1234',
  } as SettingInfo;

  beforeEach(() => {
    _authFacadeService = {
      isGuestUser: jest.fn(() => of(true)),
    };
    _settingsFacadeService = {
      getCachedSettings: jest.fn(() => of([mockProfile])),
    };
    TestBed.configureTestingModule({
      providers: [
        { provide: SettingsFacadeService, useValue: _settingsFacadeService },
        { provide: AuthFacadeService, useValue: _authFacadeService },
      ],
    });

    service = TestBed.inject(ProfileServiceFacade);
  });

  afterEach(() => {
    _authFacadeService.isGuestUser.mockReset();
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should return the housing profile', async () => {
    const profile = await service.determineCurrentProfile([mockProfile] as SettingInfo[]);
    expect(profile).toEqual(APP_PROFILES.housing);
  });

  it('should return the housing profile guest', async () => {
    const profile = await service.determineCurrentProfile([] as SettingInfo[]);
    expect(profile).toEqual(APP_PROFILES.guest);
  });

  it('should return the housing profile patron', async () => {

    _authFacadeService.isGuestUser = jest.fn().mockImplementationOnce(() => {
        return of(false)
      });

    const profile = await service.determineCurrentProfile([] as SettingInfo[]);
    expect(profile).toEqual(APP_PROFILES.patron);
  });

  it('should determine current profile', async () => {
    const profile = await firstValueFrom(service.determineCurrentProfile$());
    expect(profile).toEqual(APP_PROFILES.housing);
  });

  it('should determine is housing is enabled', async () => {
    const enable = await service.housingOnlyEnabled();
    expect(enable).toEqual(true);
  });
});
