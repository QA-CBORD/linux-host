import { TestBed } from '@angular/core/testing';
import { UserAutoDepositSettingInfo } from '../models/auto-deposit-settings';
import { AutoDepositApiService } from './auto-deposit-api-service.service';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { AutoDepositService } from './auto-deposit.service';

describe('AutoDepositService', () => {
  let service: AutoDepositService;

  beforeEach(() => {
    const autoDepositApiServiceStub = () => ({
      getUserAutoDepositSettingInfo: () => ({ pipe: () => ({}) }),
      retrieveAutoDepositAccountList: type => ({}),
      updateAutoDepositSettings: settings => ({ pipe: () => ({}) })
    });
    const userFacadeServiceStub = () => ({
      getUserData$: () => ({ pipe: () => ({}) })
    });
    const settingsFacadeServiceStub = () => ({
      getSetting: aUTO_DEPOSIT_PAYMENT_TYPES => ({ pipe: () => ({}) })
    });
    TestBed.configureTestingModule({
      providers: [
        AutoDepositService,
        {
          provide: AutoDepositApiService,
          useFactory: autoDepositApiServiceStub
        },
        { provide: UserFacadeService, useFactory: userFacadeServiceStub },
        {
          provide: SettingsFacadeService,
          useFactory: settingsFacadeServiceStub
        }
      ]
    });
    service = TestBed.inject(AutoDepositService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('updateAutoDepositSettings', () => {
    it('makes expected calls', () => {
      const userAutoDepositSettingInfoStub: UserAutoDepositSettingInfo = <
        any
      >{};
      const autoDepositApiServiceStub: AutoDepositApiService = TestBed.inject(
        AutoDepositApiService
      );
      spyOn(
        autoDepositApiServiceStub,
        'updateAutoDepositSettings'
      ).and.callThrough();
      service.updateAutoDepositSettings(userAutoDepositSettingInfoStub);
      expect(
        autoDepositApiServiceStub.updateAutoDepositSettings
      ).toHaveBeenCalled();
    });
  });

  describe('getUserAutoDepositInfo', () => {
    it('makes expected calls', () => {
      const autoDepositApiServiceStub: AutoDepositApiService = TestBed.inject(
        AutoDepositApiService
      );
      spyOn(
        autoDepositApiServiceStub,
        'getUserAutoDepositSettingInfo'
      ).and.callThrough();
      service.getUserAutoDepositInfo();
      expect(
        autoDepositApiServiceStub.getUserAutoDepositSettingInfo
      ).toHaveBeenCalled();
    });
  });

  describe('getAutoDepositAccountList', () => {
    it('makes expected calls', () => {
      const autoDepositApiServiceStub: AutoDepositApiService = TestBed.inject(
        AutoDepositApiService
      );
      const settingsFacadeServiceStub: SettingsFacadeService = TestBed.inject(
        SettingsFacadeService
      );
      spyOn(
        autoDepositApiServiceStub,
        'retrieveAutoDepositAccountList'
      ).and.callThrough();
      spyOn(settingsFacadeServiceStub, 'getSetting').and.callThrough();
      service.getAutoDepositAccountList();
      expect(
        autoDepositApiServiceStub.retrieveAutoDepositAccountList
      ).toHaveBeenCalled();
      expect(settingsFacadeServiceStub.getSetting).toHaveBeenCalled();
    });
  });
});
