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
import { PhotoType, PhotoUploadService } from '../services/photo-upload.service';
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
    governmentIdRequired$: of(true),
    photoUploadSettings: {
      saveWidth: 100,
      saveHeight: 100,
    },
  };

  let loadingService = {
    showSpinner: jest.fn(),
    closeSpinner: jest.fn(),
  };
  let actionSheetCtrl = {
    // create: jest.fn().mockResolvedValue(({ present: jest.fn().mockResolvedValue(null), onWillDismiss: jest.fn().mockResolvedValue( { role: 'take-photo'}) })),
    create: jest.fn().mockResolvedValue(true),
  };
  let cd = {
    detectChanges: jest.fn(),
  };

  let photoCropModalService = {
    photoCropModalService: jest.fn(),
  };

  let cameraService = {
    getPhoto: jest.fn().mockResolvedValue(true),
  };

  let controller = {
    present: jest.fn(async() => true),
    onWillDismiss: jest.fn(async() => ({ role: 'take-photo'}))
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PhotoUploadComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: Router, useValue: router },
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

  // it('should call camera service ', () => {
  //   let spy = jest.spyOn(cameraService, 'getPhoto');
  //   component.onGetPhoto(PhotoType.GOVT_ID_FRONT, CameraSource.Camera);
  //   component.onGetPhoto(PhotoType.GOVT_ID_FRONT, CameraSource.Photos);
  //   component.onGetPhoto(PhotoType.GOVT_ID_BACK, CameraSource.Camera);
  //   component.onGetPhoto(PhotoType.GOVT_ID_BACK, CameraSource.Photos);
  //   component.onGetPhoto(PhotoType.PROFILE, CameraSource.Camera);
  //   component.onGetPhoto(PhotoType.PROFILE, CameraSource.Photos);
  //   component.onGetPhoto(PhotoType.PROFILE_PENDING, CameraSource.Camera);
  //   component.onGetPhoto(PhotoType.PROFILE_PENDING, CameraSource.Photos);
  //   expect(spy).toHaveBeenCalledTimes(8);
  // });

  it('should call camera service', async () => {
    //jest.resetAllMocks();
     const createdIphone = await actionSheetCtrl.create();;
     console.log(createdIphone);
    //  const c = await createdIphone.present();
    //  const d = await createdIphone.onWillDismiss();
    // const created = await createdIphone.present();
    // const dismiss = await createdIphone.onWillDismiss();
    let spy =  jest
      .spyOn(actionSheetCtrl,'create')
      .mockResolvedValue(controller);
    let spy2 = jest.spyOn(component, 'onGetPhoto');
    try {
      await component.presentPhotoTypeSelection(PhotoType.GOVT_ID_FRONT);
    } catch (error) {
      console.log(error);
    }

    // component.presentPhotoTypeSelection(PhotoType.GOVT_ID_BACK);
    // component.presentPhotoTypeSelection(PhotoType.PROFILE);
    // component.presentPhotoTypeSelection(PhotoType.PROFILE_PENDING);
    //expect(spy).toBeCalledTimes(1);
    expect(spy2).toHaveBeenCalledTimes(1);
  });
});
