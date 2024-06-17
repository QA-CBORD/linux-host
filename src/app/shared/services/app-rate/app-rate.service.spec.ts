import { StorageEntity } from '@core/classes/extendable-state-manager';
import { AppRateService } from './app-rate.service';
import { StorageStateService } from '@core/states/storage/storage-state.service';
import { Platform } from '@ionic/angular';
import { AppRate } from '@shared/model/app-rate.model';
import { lastValueFrom, of } from 'rxjs';

jest.mock('@capacitor-community/in-app-review', () => ({
  RateApp: {
    requestReview: jest.fn(),
  },
}));

describe('AppRateService', () => {
  let service: AppRateService;
  let storageStateService: jest.Mocked<StorageStateService>;
  let platform: jest.Mocked<Platform>;

  beforeEach(() => {
    storageStateService = {
      getStateEntityByKey$: jest.fn(),
      updateStateEntity: jest.fn(),
    } as any;

    platform = {
      is: jest.fn(),
    } as any;

    service = new AppRateService(platform, storageStateService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should evaluate to request rate app when user has rate the app after 21 days passed', async () => {
    const lastDateRated = new Date();
    lastDateRated.setDate(lastDateRated.getDate() - 21);
    platform.is.mockReturnValueOnce(false);
    storageStateService.getStateEntityByKey$.mockReturnValue(
      of({ value: { wasRated: true, lastDateRated } } as StorageEntity<AppRate>)
    );
    const rateAppSpy = jest.spyOn(service, 'rateApp');
    await service.evaluateToRequestRateApp();
    expect(rateAppSpy).toHaveBeenCalled();
  });

  it('should rate app', async () => {
    platform.is.mockReturnValueOnce(false);
    storageStateService.getStateEntityByKey$.mockReturnValue(of({ value: {} } as StorageEntity<AppRate>));
    await service.rateApp();
    expect(storageStateService.updateStateEntity).toHaveBeenCalled();
  });

  it('should not rate app if platform is desktop', async () => {
    platform.is.mockReturnValueOnce(true);
    storageStateService.getStateEntityByKey$.mockReturnValue(of({ value: {} } as StorageEntity<AppRate>));
    await service.rateApp();
    expect(storageStateService.updateStateEntity).not.toHaveBeenCalled();
  });

  it('should get app rate state', async () => {
    storageStateService.getStateEntityByKey$.mockReturnValue(of({ value: {} } as StorageEntity<AppRate>));
    const appRateState = await lastValueFrom(service['getAppRateState']());
    expect(appRateState).toEqual({ value: {} });
  });
});
