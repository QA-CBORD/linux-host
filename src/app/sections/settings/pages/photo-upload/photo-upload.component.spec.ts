import { ChangeDetectorRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CameraSource } from '@capacitor/camera';
import { IdentityFacadeService } from '@core/facades/identity/identity.facade.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { ToastService } from '@core/service/toast/toast.service';
import { ActionSheetController, NavController } from '@ionic/angular';
import { of } from 'rxjs';
import { CameraService } from '../services/camera.service';
import { PhotoCropModalService } from '../services/photo-crop.service';
import { PhotoUploadService } from '../services/photo-upload.service';
import { LocalPhotoData, PhotoUploadComponent } from './photo-upload.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PhotoType } from './models/photo-upload.enums';
import { NavigationService } from '@shared/index';

describe('PhotoUploadComponent', () => {
  let component: PhotoUploadComponent;
  let fixture: ComponentFixture<PhotoUploadComponent>;

  const router = {
    navigate: jest.fn(),
  };

  const domSanitizer = {};
  const identityFacadeServiceStub = {};
  const toastService = {
    showToast: jest.fn(),
    showError: jest.fn(),
  };

  const photoUploadService = {
    clearLocalGovernmentIdPhotos: jest.fn(),
    clearLocalProfilePhoto: jest.fn(),
    clearLocalPendingPhoto: jest.fn(),
    getInitialPhotoData$: jest.fn(() => of(true)),
    presentPhotoTypeSelection: jest.fn(() => of(CameraSource.Photos)),
    govtIdFront$: of(true),
    govtIdBack$: of(true),
    profileImage$: of(true),
    profileImagePending$: of(true),
    governmentIdRequired$: of(true),
    photoUploadSettings: {
      saveWidth: 100,
      saveHeight: 100,
    },
  };

  const loadingService = {
    showSpinner: jest.fn(),
    closeSpinner: jest.fn(),
  };
  const actionSheetCtrl = {
    create: jest.fn().mockResolvedValue(true),
  };

  const cd = {
    detectChanges: jest.fn(),
  };

  const photoCropModalService = {
    photoCropModalService: jest.fn(),
  };

  const cameraService = {
    getPhoto: jest.fn().mockResolvedValue(true),
  };

  const mockTranslateService = {
    currentLang: 'en',
    setTranslation: jest.fn(),
    get: jest.fn().mockReturnValue(of('')),
    translate: jest.fn().mockReturnValue(of('')),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), PhotoUploadComponent],
      providers: [
        { provide: Router, useValue: router },
        { provide: DomSanitizer, useValue: domSanitizer },
        { provide: IdentityFacadeService, useValue: identityFacadeServiceStub },
        { provide: ToastService, useValue: toastService },
        { provide: PhotoUploadService, useValue: photoUploadService },
        { provide: LoadingService, useValue: loadingService },
        { provide: ActionSheetController, useValue: actionSheetCtrl },
        { provide: ChangeDetectorRef, useValue: cd },
        { provide: PhotoCropModalService, useValue: photoCropModalService },
        { provide: CameraService, useValue: cameraService },
        {
          provide: NavigationService,
          useValue: {
            getPreviousTrackedUrl: jest.fn(),
          },
        },
        {
          provide: NavController,
          useValue: {
            navigateForward: jest.fn(),
          },
        },
        {
          provide: TranslateService,
          useValue: {
            get: jest.fn().mockReturnValue(of('some message')),
            instant: (key: string) => key,
            onLangChange: of(),
            onTranslationChange: of(),
            onDefaultLangChange: of(),
          },
        },
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

  it('should call camera service', () => {
    const spy = jest.spyOn(cameraService, 'getPhoto');
    component.onGetPhoto(null, null);
    expect(spy).not.toHaveBeenCalled();
  });

  it('should call camera service', () => {
    const spy = jest.spyOn(cameraService, 'getPhoto');
    component.onGetPhoto(PhotoType.GOVT_ID_FRONT, CameraSource.Camera);
    component.onGetPhoto(PhotoType.GOVT_ID_FRONT, CameraSource.Photos);
    component.onGetPhoto(PhotoType.GOVT_ID_BACK, CameraSource.Camera);
    component.onGetPhoto(PhotoType.GOVT_ID_BACK, CameraSource.Photos);
    component.onGetPhoto(PhotoType.PROFILE, CameraSource.Camera);
    component.onGetPhoto(PhotoType.PROFILE, CameraSource.Photos);
    component.onGetPhoto(PhotoType.PROFILE_PENDING, CameraSource.Camera);
    component.onGetPhoto(PhotoType.PROFILE_PENDING, CameraSource.Photos);
    expect(spy).toHaveBeenCalledTimes(8);
  });

  it('should call onGetPhoto on take-photo role', async () => {
    const spy = jest.spyOn(component, 'onGetPhoto');
    await presentPhotoTypeSelections(component);
    expect(spy).toHaveBeenCalledTimes(4);
  });

  it('should call onGetPhoto on select-photo role', async () => {
    jest.clearAllMocks();
    const spy = jest.spyOn(component, 'onGetPhoto');
    await presentPhotoTypeSelections(component);
    expect(spy).toHaveBeenCalledTimes(4);
  });

  it('should have cleared the photo info', async () => {
    const spy = jest.spyOn(photoUploadService, 'clearLocalGovernmentIdPhotos');
    component.ionViewWillEnter();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  describe('onPhotoTypeSelection', () => {
    it('should return false if localPhotoData is null', () => {
      component.localPhotoData = null;
      expect(component.validateLocalPhotosData()).toBe(false);
    });

    it('should return false if any photo data is missing', () => {
      // Only setting one of the required properties
      component.localPhotoData = { govtIdRequired: true, profilePending: { data: 'someData' } } as LocalPhotoData;
      expect(component.validateLocalPhotosData()).toBe(false);
      expect(toastService.showError).toHaveBeenCalled();
    });

    it('should return true if all photo data is present and valid', () => {
      component.localPhotoData = {
        govtIdRequired: true,
        profilePending: { data: 'data1' },
        govIdFront: { data: 'data2' },
        govIdBack: { data: 'data3' },
      } as LocalPhotoData;
      expect(component.validateLocalPhotosData()).toBe(true);
    });

    it('should show an error toast for the first invalid photo submission found', () => {
      component.localPhotoData = {
        govtIdRequired: true,
        profilePending: { data: 'data1' },
        govIdFront: null, // Missing data
        govIdBack: { data: 'data3' },
      } as LocalPhotoData;
      component.validateLocalPhotosData();
      // Assuming PhotoTypeTranslateMap[1] corresponds to the translation key for govIdFront's error
      expect(toastService.showError).toHaveBeenCalledWith({
        duration: 5000,
        message: 'get_mobile.photo_upload.invalid_photo_submission.govt_id_front',
      });
    });
  });
});

async function presentPhotoTypeSelections(component: PhotoUploadComponent) {
  await component.presentPhotoTypeSelection(PhotoType.GOVT_ID_FRONT);
  await component.presentPhotoTypeSelection(PhotoType.GOVT_ID_BACK);
  await component.presentPhotoTypeSelection(PhotoType.PROFILE);
  await component.presentPhotoTypeSelection(PhotoType.PROFILE_PENDING);
}
