import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { IdentityFacadeService } from '@core/facades/identity/identity.facade.service';
import { SessionFacadeService } from '@core/facades/session/session.facade.service';
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
        { provide: Platform, useValue: platformStub },
        { provide: IdentityFacadeService, useValue: identityFacadeServiceStub }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
    service = TestBed.inject(CameraService);
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });
});
