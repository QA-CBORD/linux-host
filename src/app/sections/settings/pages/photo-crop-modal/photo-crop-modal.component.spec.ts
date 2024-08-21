import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Dimensions } from 'ngx-image-cropper';
import { LoadingService } from '@core/service/loading/loading.service';
import { PhotoUploadService } from '../services/photo-upload.service';
import { ToastService } from '@core/service/toast/toast.service';
import { PhotoCropModalComponent } from './photo-crop-modal.component';
import { TranslateServiceStub } from '@sections/notifications/notifications.component.spec';
import { TranslateFacadeService } from '@core/facades/translate/translate.facade.service';

describe('PhotoCropModalComponent', () => {
  let component: PhotoCropModalComponent;
  let fixture: ComponentFixture<PhotoCropModalComponent>;

  beforeEach(() => {
    const modalControllerStub = () => ({ dismiss: object => ({}) });
    const popoverControllerStub = () => ({
      create: object => ({ present: () => ({}) })
    });
    const loadingServiceStub = () => ({
      showSpinner: () => ({}),
      closeSpinner: () => ({})
    });
    const photoUploadServiceStub = () => ({
      photoUploadSettings: { saveHeight: {}, saveWidth: {} },
      orientation: {}
    });
    const toastServiceStub = { showToast: jest.fn(), showError: jest.fn() };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [PhotoCropModalComponent],
      providers: [
        { provide: ModalController, useFactory: modalControllerStub },
        { provide: PopoverController, useFactory: popoverControllerStub },
        { provide: LoadingService, useFactory: loadingServiceStub },
        { provide: PhotoUploadService, useFactory: photoUploadServiceStub },
        { provide: ToastService, useValue: toastServiceStub },
        { provide: TranslateFacadeService, useClass: TranslateServiceStub }
      ]
    });
    fixture = TestBed.createComponent(PhotoCropModalComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('cropperIsReady', () => {
    it('makes expected calls', () => {
      const dimensionsStub: Dimensions = <any>{};
      const loadingServiceStub: LoadingService = fixture.debugElement.injector.get(
        LoadingService
      );
     jest.spyOn(loadingServiceStub, 'closeSpinner');
      component.cropperIsReady(dimensionsStub);
      expect(loadingServiceStub.closeSpinner).toHaveBeenCalled();
    });
  });

  describe('ionViewWillEnter', () => {
    it('makes expected calls', () => {
      const loadingServiceStub: LoadingService = fixture.debugElement.injector.get(
        LoadingService
      );
     jest.spyOn(loadingServiceStub, 'showSpinner');
      component.ionViewWillEnter();
      expect(loadingServiceStub.showSpinner).toHaveBeenCalled();
    });
  });

  describe('loadImageFailed', () => {
    it('makes expected calls', () => {
      const toastServiceStub: ToastService = fixture.debugElement.injector.get(
        ToastService
      );
     jest.spyOn(toastServiceStub, 'showError');
      component.loadImageFailed();
      expect(toastServiceStub.showError).toHaveBeenCalled();
    });
  });

  describe('showModal', () => {
    it('makes expected calls', () => {
      const popoverControllerStub: PopoverController = fixture.debugElement.injector.get(
        PopoverController
      );
     jest.spyOn(popoverControllerStub, 'create');
      component.showModal();
      expect(popoverControllerStub.create).toHaveBeenCalled();
    });
  });
});
