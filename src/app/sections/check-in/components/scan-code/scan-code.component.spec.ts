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

describe('ScanCodeComponent', () => {
  let component: ScanCodeComponent;
  let fixture: ComponentFixture<ScanCodeComponent>;
  
  const locationStub = { back: jest.fn()};
  
  beforeEach(() => {
    const modalControllerStub = () => ({ dismiss: object => ({}) });
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

    jest.mock('@capacitor/core', () => ({
      ...jest.requireActual('@capacitor/core'),
      registerPlugin: 'android'
  }));
  
    
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ScanCodeComponent],
      providers: [
        { provide: Location, useValue: locationStub },
        { provide: ModalController, useFactory: modalControllerStub },
        { provide: Platform, useFactory: platformStub },
        { provide: Router, useFactory: routerStub },
        { provide: ToastService, useFactory: toastServiceStub },
        { provide: NativeProvider, useFactory: nativeProviderStub },
        { provide: TranslateService, useValue: translateService},
      ] 
    });
    fixture = TestBed.createComponent(ScanCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  // describe('ionViewWillLeave', () => {
  //   it('makes expected calls', () => {
     
  //    jest.spyOn(locationStub, 'back');
  //     component.ionViewWillLeave();
  //     expect(locationStub.back).toHaveBeenCalled();
  //   });
  // });

  // describe('manualEntry', () => {
  //   it('makes expected calls', () => {
  //     const modalControllerStub: ModalController = fixture.debugElement.injector.get(
  //       ModalController
  //     );
  //    jest.spyOn(modalControllerStub, 'dismiss');
  //     component.manualEntry();
  //     expect(modalControllerStub.dismiss).toHaveBeenCalled();
  //   });
  // });
});
