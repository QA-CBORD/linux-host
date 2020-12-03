import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ImageCroppedEvent, Dimensions } from 'ngx-image-cropper';
import { LoadingService } from '@core/service/loading/loading.service';
import { PhotoUploadService } from '../services/photo-upload.service';

@Component({
  selector: 'app-image-crop-modal',
  templateUrl: './photo-crop-modal.component.html',
  styleUrls: ['./photo-crop-modal.component.scss'],
})
export class PhotoCropModalComponent {
  croppedImageBase64 = '';
  saveHeight = 0;
  saveWidth = 0;

  @Input() imageBase64 = '';

  constructor(
    private modalController: ModalController,
    private loadingService: LoadingService,
    private photoUploadService: PhotoUploadService
  ) {}

  ionViewWillEnter() {
    this.loadingService.showSpinner();
    const uploadSettings = this.photoUploadService.photoUploadSettings;
    this.saveHeight = uploadSettings.saveHeight ? uploadSettings.saveHeight : 176;
    this.saveWidth = uploadSettings.saveWidth ? uploadSettings.saveWidth : 129;
  }

  cropperIsReady() {
    this.loadingService.closeSpinner();
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImageBase64 = event.base64;
  }

  dismissModal(croppedImageBase64?: string) {
    this.modalController.dismiss({ croppedImageBase64 });
  }
}
