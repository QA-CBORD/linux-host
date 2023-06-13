import { TestBed } from '@angular/core/testing';
import { SettingInfoList } from 'src/app/core/model/configuration/setting-info-list.model';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { DashboardService } from './dashboard.service';

describe('DashboardService', () => {
  let service: DashboardService;

  beforeEach(() => {
    const settingsFacadeServiceStub = () => ({
      fetchSettingList: fEATURES => ({}),
      getSettings: requiredSettings => ({ pipe: () => ({}) })
    });
    TestBed.configureTestingModule({
      providers: [
        DashboardService,
        {
          provide: SettingsFacadeService,
          useFactory: settingsFacadeServiceStub
        }
      ]
    });
    service = TestBed.inject(DashboardService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('retrieveSettingsList', () => {
    it('makes expected calls', () => {
      const settingsFacadeServiceStub: SettingsFacadeService = TestBed.inject(
        SettingsFacadeService
      );
      spyOn(settingsFacadeServiceStub, 'fetchSettingList').and.callThrough();
      service.retrieveSettingsList();
      expect(settingsFacadeServiceStub.fetchSettingList).toHaveBeenCalled();
    });
  });

  describe('isAddFundsButtonEnabled', () => {
    it('makes expected calls', () => {
      const settingsFacadeServiceStub: SettingsFacadeService = TestBed.inject(
        SettingsFacadeService
      );
      spyOn(settingsFacadeServiceStub, 'getSettings').and.callThrough();
      service.isAddFundsButtonEnabled();
      expect(settingsFacadeServiceStub.getSettings).toHaveBeenCalled();
    });
  });
});
