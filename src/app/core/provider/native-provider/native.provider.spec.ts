import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';
import { Platform } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { NativeProvider } from './native.provider';

describe('NativeProvider', () => {
  let service: NativeProvider;

  beforeEach(() => {
    const routerStub = () => ({
      url: { indexOf: () => ({}) },
      navigate: (array, object) => ({})
    });
    const ngZoneStub = () => ({ run: function0 => ({}) });
    const platformStub = () => ({
      platforms: () => ({ includes: () => ({}) }),
      is: string => ({})
    });
    const modalControllerStub = () => ({ getTop: () => ({}) });
    const popoverControllerStub = () => ({ getTop: () => ({}) });
    const actionSheetControllerStub = () => ({ getTop: () => ({}) });
    const alertControllerStub = () => ({
      getTop: () => ({}),
      dismiss: () => ({})
    });
    TestBed.configureTestingModule({
      providers: [
        NativeProvider,
        { provide: Router, useFactory: routerStub },
        { provide: NgZone, useFactory: ngZoneStub },
        { provide: Platform, useFactory: platformStub },
        { provide: ModalController, useFactory: modalControllerStub },
        { provide: PopoverController, useFactory: popoverControllerStub },
        {
          provide: ActionSheetController,
          useFactory: actionSheetControllerStub
        },
        { provide: AlertController, useFactory: alertControllerStub }
      ]
    });
    service = TestBed.inject(NativeProvider);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('isAndroid', () => {
    it('makes expected calls', () => {
      const platformStub: Platform = TestBed.inject(Platform);
     jest.spyOn(platformStub, 'platforms');
      service.isAndroid();
      expect(platformStub.platforms).toHaveBeenCalled();
    });
  });

  describe('isIos', () => {
    it('makes expected calls', () => {
      const platformStub: Platform = TestBed.inject(Platform);
     jest.spyOn(platformStub, 'platforms');
      service.isIos();
      expect(platformStub.platforms).toHaveBeenCalled();
    });
  });

  describe('isWeb', () => {
    it('makes expected calls', () => {
      const platformStub: Platform = TestBed.inject(Platform);
     jest.spyOn(platformStub, 'is');
      service.isWeb();
      expect(platformStub.is).toHaveBeenCalled();
    });
  });

  describe('isMobile', () => {
    it('makes expected calls', () => {
      const platformStub: Platform = TestBed.inject(Platform);
     jest.spyOn(platformStub, 'is');
      service.isMobile();
      expect(platformStub.is).toHaveBeenCalled();
    });
  });

  describe('onNativeBackClicked', () => {
    it('makes expected calls', () => {
      const ngZoneStub: NgZone = TestBed.inject(NgZone);
     jest.spyOn(service, 'dismissTopControllers');
     jest.spyOn(ngZoneStub, 'run');
      service.onNativeBackClicked();
      expect(service.dismissTopControllers).toHaveBeenCalled();
      expect(ngZoneStub.run).toHaveBeenCalled();
    });
  });

  describe('getPatronBarcode', () => {
    it('makes expected calls', () => {
     jest.spyOn(service, 'isAndroid');
     jest.spyOn(service, 'getAndroidData');
     jest.spyOn(service, 'isIos');
     jest.spyOn(service, 'getIosData');
      service.getPatronBarcode();
      expect(service.isAndroid).toHaveBeenCalled();
      expect(service.getAndroidData).toHaveBeenCalled();
      expect(service.isIos).toHaveBeenCalled();
      expect(service.getIosData).toHaveBeenCalled();
    });
  });
});
