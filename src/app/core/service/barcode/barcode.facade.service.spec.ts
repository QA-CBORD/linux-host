import { TestBed } from "@angular/core/testing";
import { SettingsFacadeService } from "@core/facades/settings/settings-facade.service";
import { StorageStateService } from "@core/states/storage/storage-state.service";
import { BarcodeService } from "./barcode.service";
import { BarcodeFacadeService } from "./barcode.facade.service";
import { AuthFacadeService } from "@core/facades/auth/auth.facade.service";

describe("BarcodeFacadeService", () => {
  let service: BarcodeFacadeService;

  beforeEach(() => {
    const settingsFacadeServiceStub = () => ({
      getUserSetting: setting => ({ pipe: () => ({}) }),
      getSetting: setting => ({ pipe: () => ({}) })
    });
    const storageStateServiceStub = () => ({
      updateStateEntity: (setting, s, object) => ({}),
      getStateEntityByKey$: key => ({ pipe: () => ({}) })
    });
    const barcodeServiceStub = () => ({
      generateBarcode: (userSetting, setting, arg0) => ({})
    });
    const authFacadeMock = {
      generateBarcodeFromServer: jest.fn().mockReturnValue('123456'),
    };
    TestBed.configureTestingModule({
      providers: [
        BarcodeFacadeService,
        {
          provide: SettingsFacadeService,
          useFactory: settingsFacadeServiceStub
        },
        { provide: AuthFacadeService, useValue: authFacadeMock },
        { provide: StorageStateService, useFactory: storageStateServiceStub },
        { provide: BarcodeService, useFactory: barcodeServiceStub }
      ]
    });
    service = TestBed.inject(BarcodeFacadeService);
  });

  it("can load instance", () => {
    expect(service).toBeTruthy();
  });
});
