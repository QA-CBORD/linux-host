import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { UserPreferenceService } from './user-preference.service';
import { StorageStateService } from '@core/states/storage/storage-state.service';
import { StorageEntity } from '@core/classes/extendable-state-manager';

describe(UserPreferenceService, () => {
  let service: UserPreferenceService;
  let _storageStateService;

  beforeEach(() => {
    _storageStateService = {
      getStateEntityByKey$: jest.fn(() =>
        of({
          lastModified: 1,
          timeToLive: 12345,
          permanent: true,
          value: 'hello',
        } as StorageEntity)
      ),
      updateStateEntity: jest.fn(),
    };
    TestBed.configureTestingModule({
      providers: [{ provide: StorageStateService, useValue: _storageStateService }],
    });

    service = TestBed.inject(UserPreferenceService);
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should return cache is disabled when not specifying strongCheck', async () => {
    const isEnabled = await service.cachedBiometricsEnabledUserPreference();
    expect(isEnabled).toEqual(false);
  });

  it('should return cache is disabled when strongCheck is true', async () => {
    const isEnabled = await service.cachedBiometricsEnabledUserPreference();
    expect(isEnabled).toEqual(false);
  });

  it('should return cache is disabled when strongCheck is false', async () => {
    const isEnabled = await service.cachedBiometricsEnabledUserPreference();
    expect(isEnabled).toEqual(false);
  });

  it('should return cache pin is enabled', async () => {
    const isEnabled = await service.cachedPinEnabledUserPreference();
    expect(isEnabled).toEqual(true);
  });

  it('should enable the pin on storage', async () => {
    const spy1 = jest.spyOn(_storageStateService as any, 'updateStateEntity');
    service.setPinEnabledUserPreference(true);
    expect(spy1).toBeCalledTimes(1);
  });

  it('should enable biometric on storage', async () => {
    const spy1 = jest.spyOn(_storageStateService as any, 'updateStateEntity');
    service.setBiometricsEnabledUserPreference(true);
    expect(spy1).toBeCalledTimes(1);
  });

  it('should enable biometric on storage', async () => {
    const spy1 = jest.spyOn(service as any, 'setBiometricsEnabledUserPreference');
    const spy2 = jest.spyOn(_storageStateService as any, 'updateStateEntity');

    service.setBiometricPermissionDenied();

    expect(spy1).toBeCalledTimes(1);
    expect(spy2).toBeCalledTimes(2);
  });

  describe('isEnabledByKey', () => {
    it('should return true if storedData is truthy', async () => {
      const key = 'get_biometricsEnabledUserPreference';
      const useStrongCheck = false;
      const storedData = { value: 'true' };

      _storageStateService.getStateEntityByKey$ = jest.fn().mockReturnValue(of(storedData));
      const result = await service['isEnabledByKey'](key, useStrongCheck);

      expect(result).toBe(true);
    });

    it('should return false if storedData is falsy and useStrongCheck is true', async () => {
      const key = 'get_biometricsEnabledUserPreference';
      const useStrongCheck = true;
      const storedData = null;

      _storageStateService.getStateEntityByKey$ = jest.fn().mockReturnValue(of(storedData));
      const result = await service['isEnabledByKey'](key, useStrongCheck);

      expect(result).toBe(false);
    });

    it('should return true if storedData is falsy and useStrongCheck is false', async () => {
      const key = 'get_biometricsEnabledUserPreference';
      const useStrongCheck = false;
      const storedData = null;

      _storageStateService.getStateEntityByKey$ = jest.fn().mockReturnValue(of(storedData));
      const result = await service['isEnabledByKey'](key, useStrongCheck);

      expect(result).toBe(true);
    });
  });
});
