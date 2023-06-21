import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { UserAutoDepositSettingInfo } from '../models/auto-deposit-settings';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { AutoDepositApiService } from './auto-deposit-api-service.service';

describe('AutoDepositApiService', () => {
  let service: AutoDepositApiService;

  beforeEach(() => {
    const userFacadeServiceStub = () => ({
      getUserData$: () => ({ pipe: () => ({}) })
    });
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AutoDepositApiService,
        { provide: UserFacadeService, useFactory: userFacadeServiceStub }
      ]
    });
    service = TestBed.inject(AutoDepositApiService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('updateAutoDepositSettings', () => {
    it('makes expected calls', () => {
      const userAutoDepositSettingInfoStub: UserAutoDepositSettingInfo = <
        any
      >{};
      service
        .updateAutoDepositSettings(userAutoDepositSettingInfoStub)
        .subscribe(res => {
          expect(res).toEqual(userAutoDepositSettingInfoStub);
        });
    });
  });

});
