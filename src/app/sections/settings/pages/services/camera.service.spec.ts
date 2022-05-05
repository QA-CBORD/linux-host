import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { SessionFacadeService } from '@core/facades/session/session.facade.service';
import { Platform } from '@ionic/angular';

import { CameraService } from './camera.service';

describe('CameraService', () => {
  let service: CameraService;

  beforeEach(() => {
    const SessionServiceStub = {},
      platformStub = {
        ready: jest.fn(),
      };

    TestBed.configureTestingModule({
      providers: [
        { provide: Platform, useValue: SessionServiceStub },
        { provide: SessionFacadeService, useValue: platformStub },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
    service = TestBed.inject(CameraService);
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });
});
