import { TestBed } from '@angular/core/testing';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { UserSettingInfo } from '@core/model/user';
import { SettingInfo } from '@core/model/configuration/setting-info.model';
import { BarcodeService } from './barcode.service';

describe('BarcodeService', () => {
  let service: BarcodeService;

  beforeEach(() => {
    const settingsFacadeServiceStub = () => ({
      getSetting: sOA_KEY => ({ pipe: () => ({}) })
    });
    TestBed.configureTestingModule({
      providers: [
        BarcodeService,
        {
          provide: SettingsFacadeService,
          useFactory: settingsFacadeServiceStub
        }
      ]
    });
    service = TestBed.inject(BarcodeService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
