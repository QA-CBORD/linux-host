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
    const toastServiceStub = () => ({ showToast: object => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [PhotoCropModalComponent],
      providers: [
        { provide: ModalController, useFactory: modalControllerStub },
        { provide: PopoverController, useFactory: popoverControllerStub },
        { provide: LoadingService, useFactory: loadingServiceStub },
        { provide: PhotoUploadService, useFactory: photoUploadServiceStub },
        { provide: ToastService, useFactory: toastServiceStub }
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
      spyOn(loadingServiceStub, 'closeSpinner').and.callThrough();
      component.cropperIsReady(dimensionsStub);
      expect(loadingServiceStub.closeSpinner).toHaveBeenCalled();
    });
  });

  describe('ionViewWillEnter', () => {
    it('makes expected calls', () => {
      const loadingServiceStub: LoadingService = fixture.debugElement.injector.get(
        LoadingService
      );
      spyOn(loadingServiceStub, 'showSpinner').and.callThrough();
      component.ionViewWillEnter();
      expect(loadingServiceStub.showSpinner).toHaveBeenCalled();
    });
  });

  describe('loadImageFailed', () => {
    it('makes expected calls', () => {
      const toastServiceStub: ToastService = fixture.debugElement.injector.get(
        ToastService
      );
      spyOn(toastServiceStub, 'showToast').and.callThrough();
      component.loadImageFailed();
      expect(toastServiceStub.showToast).toHaveBeenCalled();
    });
  });

  describe('showModal', () => {
    it('makes expected calls', () => {
      const popoverControllerStub: PopoverController = fixture.debugElement.injector.get(
        PopoverController
      );
      spyOn(popoverControllerStub, 'create').and.callThrough();
      component.showModal();
      expect(popoverControllerStub.create).toHaveBeenCalled();
    });
  });
});
