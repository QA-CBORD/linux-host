import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SettingsApiService } from './settings-api.service';
import { simpleApiMethodAssert, simpleServiceApiToAssert } from 'src/app/testing/helpers/api-helpers';

describe('SettingsApiService', () => {
  let service: SettingsApiService;
  let httpTestingController: HttpTestingController;
  const serviceURL = '/json/user';
  const serviceConfigURL = '/json/configuration';
  let serviceAssert: (method: keyof typeof service, params?: any[], serviceURL?: string, httpMethod?: string) => void;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SettingsApiService],
    });
    service = TestBed.inject(SettingsApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
    serviceAssert = simpleServiceApiToAssert(httpTestingController, service);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
  it('makes getSetting calls', () => {
    serviceAssert('getSetting', ['test.test.test', '123456', '123456'], serviceConfigURL);
  });
  it('makes getSettings calls', () => {
    serviceAssert('getSettings', [['test.test.test']], serviceConfigURL);
  });
  it('makes getSettingList calls', () => {
    serviceAssert('getSettingList', [['test.test.test'], '123456', '123456'], serviceConfigURL);
  });
  it('makes deleteUserSetting calls', () => {
    serviceAssert('deleteUserSetting', [], serviceURL);
  });

  it('makes saveUserSetting calls', () => {
    serviceAssert('saveUserSetting', [], serviceURL);
  });

  it('makes getUserSetting calls', () => {
    serviceAssert('getUserSetting', [], serviceURL);
  });
});
