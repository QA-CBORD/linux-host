import { ChangeDetectorRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { SessionFacadeService } from '@core/facades/session/session.facade.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { ToastService } from '@core/service/toast/toast.service';
import { ActionSheetController } from '@ionic/angular';
import { of } from 'rxjs';
import { CameraService } from '../services/camera.service';
import { PhotoCropModalService } from '../services/photo-crop.service';
import { PhotoUploadService } from '../services/photo-upload.service';
import { PhotoUploadComponent } from './photo-upload.component';

describe('PhotoUploadComponent', () => {
  let component: PhotoUploadComponent;
  let fixture: ComponentFixture<PhotoUploadComponent>;

  let router = {
    navigate: jest.fn(),
  };

  let domSanitizer = {};
  let sessionFacadeService = {};
  let toastService = {
    showToast: jest.fn(),
  };

  let photoUploadService = {
    clearLocalGovernmentIdPhotos: jest.fn(),
    clearLocalProfilePhoto: jest.fn(),
    getInitialPhotoData$: jest.fn(() => of(true)),
    govtIdFront$: of(true),
    govtIdBack$: of(true),
    profileImage$: of(true),
    profileImagePending$: of(true),
    governmentIdRequired$: of(true)
  };

  let loadingService = {
    showSpinner: jest.fn(),
    closeSpinner: jest.fn(),
  };
  let actionSheetCtrl = {
    clearLocalGovernmentIdPhotos: jest.fn(),
    clearLocalProfilePhoto: jest.fn(),
  };

  let cd = {
    detectChanges: jest.fn(),
  };

  let photoCropModalService = {
    photoCropModalService: jest.fn(),
  };

  let cameraService = {
    getPhoto: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PhotoUploadComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: Router, useValue: router},
        { provide: DomSanitizer, useValue: domSanitizer },
        { provide: SessionFacadeService, useValue: sessionFacadeService },
        { provide: ToastService, useValue: toastService },
        { provide: PhotoUploadService, useValue: photoUploadService },
        { provide: LoadingService, useValue: loadingService },
        { provide: ActionSheetController, useValue: actionSheetCtrl },
        { provide: ChangeDetectorRef, useValue: cd },
        { provide: PhotoCropModalService, useValue: photoCropModalService },
        { provide: CameraService, useValue: cameraService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

    it('should create component', () => {
      expect(component).toBeTruthy();
    });
});
