import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Location } from '@angular/common';
import { ModalController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastService } from '@core/service/toast/toast.service';
import { NativeProvider } from '@core/provider/native-provider/native.provider';
import { ScanCodeComponent } from './scan-code.component';

describe('ScanCodeComponent', () => {
  let component: ScanCodeComponent;
  let fixture: ComponentFixture<ScanCodeComponent>;

  beforeEach(() => {
    const locationStub = () => ({ back: () => ({}) });
    const modalControllerStub = () => ({ dismiss: object => ({}) });
    const platformStub = () => ({
      backButton: { pipe: () => ({ subscribe: f => f({}) }) }
    });
    const routerStub = () => ({ navigate: array => ({}) });
    const toastServiceStub = () => ({ showToast: object => ({}) });
    const nativeProviderStub = () => ({ setKeepTopModal: {} });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ScanCodeComponent],
      providers: [
        { provide: Location, useFactory: locationStub },
        { provide: ModalController, useFactory: modalControllerStub },
        { provide: Platform, useFactory: platformStub },
        { provide: Router, useFactory: routerStub },
        { provide: ToastService, useFactory: toastServiceStub },
        { provide: NativeProvider, useFactory: nativeProviderStub }
      ]
    });
    fixture = TestBed.createComponent(ScanCodeComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('ionViewWillLeave', () => {
    it('makes expected calls', () => {
      const locationStub: Location = fixture.debugElement.injector.get(
        Location
      );
      spyOn(locationStub, 'back').and.callThrough();
      component.ionViewWillLeave();
      expect(locationStub.back).toHaveBeenCalled();
    });
  });

  describe('manualEntry', () => {
    it('makes expected calls', () => {
      const modalControllerStub: ModalController = fixture.debugElement.injector.get(
        ModalController
      );
      spyOn(modalControllerStub, 'dismiss').and.callThrough();
      component.manualEntry();
      expect(modalControllerStub.dismiss).toHaveBeenCalled();
    });
  });
});
