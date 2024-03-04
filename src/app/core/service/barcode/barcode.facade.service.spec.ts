import { TestBed } from '@angular/core/testing';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { StorageStateService } from '@core/states/storage/storage-state.service';
import { BarcodeService } from './barcode.service';
import { BarcodeFacadeService } from './barcode.facade.service';
import { AuthFacadeService } from '@core/facades/auth/auth.facade.service';
import { firstValueFrom, of } from 'rxjs';

describe('BarcodeFacadeService', () => {
  const barcodeFromServer = '123456';
  const barcodeFromCache = '654321';
  let service: BarcodeFacadeService;
  const storageStateServiceStub = {
    updateStateEntity: jest.fn(),
    getStateEntityByKey$: jest.fn().mockReturnValue(of(null)),
  };
  beforeEach(() => {
    const settingsFacadeServiceStub = {
      getUserSetting: jest.fn().mockReturnValue(of({})),
      getSetting: jest.fn().mockReturnValue(of({})),
    };

    const barcodeServiceStub = () => ({
      generateBarcode: (userSetting, setting, arg0) => of(barcodeFromCache),
    });
    const authFacadeMock = {
      generateBarcodeFromServer: jest.fn().mockReturnValue(of(barcodeFromServer)),
    };
    TestBed.configureTestingModule({
      providers: [
        BarcodeFacadeService,
        {
          provide: SettingsFacadeService,
          useValue: settingsFacadeServiceStub,
        },
        { provide: AuthFacadeService, useValue: authFacadeMock },
        { provide: StorageStateService, useValue: storageStateServiceStub },
        { provide: BarcodeService, useFactory: barcodeServiceStub },
      ],
    });
    service = TestBed.inject(BarcodeFacadeService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  it('generateBarcode with interval', async () => {
    storageStateServiceStub.getStateEntityByKey$.mockReturnValueOnce(of({ value: false }));
    const barcode = await firstValueFrom(service.generateBarcode(true));
    expect(barcode).toBe(barcodeFromServer);
  });

  it('generateBarcode from server', async () => {
    storageStateServiceStub.getStateEntityByKey$.mockReturnValueOnce(of({ value: false }));
    const barcode = await firstValueFrom(service.generateBarcode(false));
    expect(barcode).toBe(barcodeFromServer);
  });

  it('generateBarcode without interval', async () => {
    const barcode = await firstValueFrom(service.generateBarcode(false));
    expect(barcode).toBe(barcodeFromCache);
  });

  it('generateBarcode from chached settings', async () => {
    storageStateServiceStub.getStateEntityByKey$.mockReturnValue(of({ value: true }));
    const barcode = await firstValueFrom(service.generateBarcode(false));
    expect(barcode).toBe(barcodeFromCache);
  });
});
