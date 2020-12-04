import { Component, Input } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { ImageCroppedEvent, Dimensions } from 'ngx-image-cropper';
import { LoadingService } from '@core/service/loading/loading.service';
import { PhotoUploadService } from '../services/photo-upload.service';
import { PopoverCropComponent } from '../popover-photo-crop/popover-photo-crop.component';
import { ToastService } from '@core/service/toast/toast.service';

const DEFAULT_HEIGHT = 170;
const DEFAULT_WIDTH = 128;
const PHOTO_CROP_DELAY = 2000;

@Component({
  templateUrl: './photo-crop-modal.component.html',
  styleUrls: ['./photo-crop-modal.component.scss'],
})
export class PhotoCropModalComponent {
  @Input() imageBase64 = '';
  cropperPosition = { x1: 0, y1: 0, x2: 0, y2: 0 };
  croppedImageBase64 = '';
  saveHeight: number;
  saveWidth: number;

  constructor(
    private readonly modalController: ModalController,
    private readonly loadingService: LoadingService,
    private readonly photoUploadService: PhotoUploadService,
    private readonly popoverCtrl: PopoverController,
    private readonly toastService: ToastService
  ) {}

  ionViewWillEnter() {
    this.loadingService.showSpinner();
    const uploadSettings = this.photoUploadService.photoUploadSettings;
    this.saveHeight = uploadSettings.saveHeight ? uploadSettings.saveHeight : DEFAULT_HEIGHT;
    this.saveWidth = uploadSettings.saveWidth ? uploadSettings.saveWidth : DEFAULT_WIDTH;
  }

  cropperIsReady(originalImage: Dimensions) {
    setTimeout(() => {
      this.cropperPosition = this.getCroppingPosition(originalImage);
    }, PHOTO_CROP_DELAY);
    this.loadingService.closeSpinner();
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImageBase64 = event.base64;
  }

  async loadImageFailed() {
    await this.toastService.showToast({ message: 'There was an issue loading your photo. Please try again' });
  }

  dismissModal(croppedImageBase64?: string) {
    this.modalController.dismiss({ croppedImageBase64 });
  }

  async showModal() {
    const modal = await this.popoverCtrl.create({
      component: PopoverCropComponent,
    });
    await modal.present();
  }
  
  private getCroppingPosition(originalImage: Dimensions): any {
   const padding = 25;
   return { x1: (originalImage.width-(originalImage.width-padding)), y1: (originalImage.height-(originalImage.height-padding)), x2: (originalImage.width-padding), y2: (originalImage.height-padding) };
  }
}
