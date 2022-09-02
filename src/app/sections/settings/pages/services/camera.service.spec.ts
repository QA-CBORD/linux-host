import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CameraResultType, CameraSource } from '@capacitor/camera';
import { IdentityFacadeService } from '@core/facades/identity/identity.facade.service';
import { of } from 'rxjs';
import { CameraService } from './camera.service';


describe('CameraService', () => {
  let service: CameraService;

  beforeEach(() => {
  
      const identityFacadeServiceStub = {
        updateVaultTimeout: jest.fn(() => of(true))
      };

    TestBed.configureTestingModule({
      providers: [
        { provide: IdentityFacadeService, useValue: identityFacadeServiceStub },
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

  it('should request the camera permissions on photo', async () => {
    const spy = jest.spyOn(service as any, 'requestCameraPermission');
    try {
      await service.getPhoto({ resultType: CameraResultType.Uri, source: CameraSource.Photos });
    } catch {    
      expect(spy).toBeCalledTimes(1);
    }
  });

  it('should request the camera permissions on camera', async () => {
    const spy = jest.spyOn(service as any, 'requestCameraPermission');
    try {
      await service.getPhoto({ resultType: CameraResultType.Uri, source: CameraSource.Camera });
    } catch {    
      expect(spy).toBeCalledTimes(1);
    }
  });
});
