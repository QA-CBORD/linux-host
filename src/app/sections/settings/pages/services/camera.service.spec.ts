import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CameraResultType, CameraSource } from '@capacitor/camera';
import { IdentityFacadeService } from '@core/facades/identity/identity.facade.service';
import { Platform } from '@ionic/angular';

import { CameraService } from './camera.service';

describe('CameraService', () => {
  let service: CameraService;

  beforeEach(() => {
    const platformStub = {
        ready: jest.fn(),
      },
      identityFacadeServiceStub = {};

    TestBed.configureTestingModule({
      providers: [
        { provide: IdentityFacadeService, useValue: identityFacadeServiceStub }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
    service = TestBed.inject(CameraService);
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should dismiss the camera service', () => {
    const spy = jest.spyOn(service as any, 'requestCameraPermission');
    service.getPhoto(null);
    expect(spy).toBeCalledTimes(0);
  });

  it('should dismiss the camera service', () => {
    const spy = jest.spyOn(service as any, 'requestCameraPermission');
    service.getPhoto({ resultType: CameraResultType.Uri, source: CameraSource.Photos });
    expect(spy).toBeCalledTimes(1);
  });

  it('should dismiss the camera service', () => {
    const spy = jest.spyOn(service as any, 'requestCameraPermission');
    service.getPhoto({ resultType: CameraResultType.Uri, source: CameraSource.Camera });
    expect(spy).toBeCalledTimes(1);
  });
});
