import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Location } from '@angular/common';
import { ModalController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastService } from '@core/service/toast/toast.service';
import { NativeProvider } from '@core/provider/native-provider/native.provider';
import { ScanCodeComponent } from './scan-code.component';
import { TranslateService } from '@ngx-translate/core';

jest.mock('@capacitor-mlkit/barcode-scanning', () => ({
  ...jest.requireActual('@capacitor-mlkit/barcode-scanning'),
  BarcodeScanner: {
    scan: jest.fn().mockResolvedValue({
      barcodes: [
        {
          rawValue: 'MockedBarcode123',
          format: 'QR_CODE',
        }
      ]
    }),
    startScan: jest.fn().mockResolvedValue({}),
    stopScan: jest.fn().mockResolvedValue({}),
    removeAllListeners: jest.fn().mockResolvedValue({}),
    requestPermissions: jest.fn().mockResolvedValue({ camera: 'granted' }),
    addListener: jest.fn().mockResolvedValue({}),
  }
}));

const modalControllerStub = {
  dismiss: jest.fn()
}

describe('ScanCodeComponent', () => {
  let component: ScanCodeComponent;
  let fixture: ComponentFixture<ScanCodeComponent>;

  const locationStub = { back: jest.fn() };

  beforeEach(() => {

    const platformStub = () => ({
      backButton: { pipe: () => ({ subscribe: f => f({}) }) }
    });
    const routerStub = () => ({ navigate: array => ({}) });
    const toastServiceStub = () => ({ showToast: object => ({}) });
    const nativeProviderStub = () => ({ setKeepTopModal: {} });

    const translateService = {
      get: jest.fn().mockReturnValue('some message'),
      instant: jest.fn().mockReturnValue('some message'),
    };

    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ScanCodeComponent],
      providers: [
        { provide: Location, useValue: locationStub },
        { provide: ModalController, useValue: modalControllerStub },
        { provide: Platform, useFactory: platformStub },
        { provide: Router, useFactory: routerStub },
        { provide: ToastService, useFactory: toastServiceStub },
        { provide: NativeProvider, useFactory: nativeProviderStub },
        { provide: TranslateService, useValue: translateService }
      ]
    });
    fixture = TestBed.createComponent(ScanCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it('should start scanning', async () => {
    const spy = jest.spyOn(component as any, 'startScanning');
    await component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  describe('ionViewWillLeave', () => {
    it('makes expected calls', async () => {
      jest.spyOn(locationStub, 'back');
      component['backButtonPressed'] = false;
      await component.ionViewWillLeave();
      expect(locationStub.back).toHaveBeenCalled();
    });
  });

  describe('manualEntry', () => {
    it('makes expected calls', () => {
      jest.spyOn(modalControllerStub, 'dismiss');
      component.manualEntry();
      expect(modalControllerStub.dismiss).toHaveBeenCalled();
    });
  });
});
