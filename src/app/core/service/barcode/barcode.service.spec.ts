import { TestBed } from '@angular/core/testing';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { UserSettingInfo } from '@core/model/user';
import { SettingInfo } from '@core/model/configuration/setting-info.model';
import { BarcodeService } from './barcode.service';
import { first, firstValueFrom, from, of } from 'rxjs';

describe('BarcodeService', () => {
  let service: BarcodeService;
  const settingsFacadeServiceStub = {
    getSetting: jest.fn().mockReturnValue(of({ value: '123456' })),
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BarcodeService,
        {
          provide: SettingsFacadeService,
          useValue: settingsFacadeServiceStub,
        },
      ],
    });
    service = TestBed.inject(BarcodeService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  it('should encode pin', async () => {
    settingsFacadeServiceStub.getSetting.mockReturnValueOnce(from([{ value: '123456' }]));
    const pin = await firstValueFrom(service.encodePin('1234'));
    expect(pin).not.toBe('1234');
  });

  it('should return pin from encode pin', async () => {
    settingsFacadeServiceStub.getSetting.mockReturnValueOnce(from([{ value: '' }]));
    const pin = await firstValueFrom(service.encodePin('1234'));
    expect(pin).toBe('1234');
  });

  it('should generate barcode', async () => {
    settingsFacadeServiceStub.getSetting.mockReturnValueOnce(from([{ value: '123456' }]));
    const textBytes = new Int8Array([4, 5, 6]);

    jest.spyOn(service as any, 'hmac_sha').mockReturnValue(of(textBytes));

    const barcode = await firstValueFrom(
      service.generateBarcode({ value: '123456' } as UserSettingInfo, { value: '123456' })
    );
    expect(barcode).not.toBe('123456');
    const barcode$ = await firstValueFrom(service.barcodeValue$.pipe(first()));
    expect(barcode$).toBe(barcode);
  });

  it('should generate barcode with interval', async () => {
    settingsFacadeServiceStub.getSetting.mockReturnValueOnce(from([{ value: '123456' }]));
    const textBytes = new Int8Array([4, 5, 6]);

    jest.spyOn(service as any, 'hmac_sha').mockReturnValue(of(textBytes));

    const barcode = await firstValueFrom(
      service.generateBarcode({ value: '123456' } as UserSettingInfo, { value: '123456' }, true)
    );
    expect(barcode).not.toBe('123456');
  });

  it('should throw exception when generating barcode with invalid data', () => {
    settingsFacadeServiceStub.getSetting.mockReturnValueOnce(from([{ value: '123456' }]));

    expect(() =>
      firstValueFrom(service.generateBarcode({ value: '123456' } as UserSettingInfo, null, true))
    ).rejects.toThrowError();
  });
});
