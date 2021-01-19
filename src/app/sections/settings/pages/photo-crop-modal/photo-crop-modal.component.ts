import { Component, Input } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { ImageCroppedEvent, Dimensions } from 'ngx-image-cropper';
import { LoadingService } from '@core/service/loading/loading.service';
import { PhotoUploadService, Orientation } from '../services/photo-upload.service';
import { PopoverCropComponent } from '../popover-photo-crop/popover-photo-crop.component';
import { ToastService } from '@core/service/toast/toast.service';

enum Default {
  HEIGHT = 170,
  WIDTH = 128,
  DELAY = 100,
  DIVIDER = 6,
  LANDSCAPE = 3 / 2,
}

enum Quality {
  MAXIMUM = 100,
  MINIMUM = 85,
}

@Component({
  templateUrl: './photo-crop-modal.component.html',
  styleUrls: ['./photo-crop-modal.component.scss'],
})
export class PhotoCropModalComponent {
  cropperPosition = { x1: 0, y1: 0, x2: 0, y2: 0 };
  @Input() profilePhoto: boolean;
  @Input() imageBase64: string;
  croppedImageBase64: string;
  qualityPercentage: number;
  saveHeight: number;
  saveWidth: number;
  aspectRatio: number;
  maintainAspectRatio: boolean;

  constructor(
    private readonly modalController: ModalController,
    private readonly loadingService: LoadingService,
    private readonly photoUploadService: PhotoUploadService,
    private readonly popoverCtrl: PopoverController,
    private readonly toastService: ToastService
  ) {}

  ionViewWillEnter() {
    this.loadingService.showSpinner();
    if (this.profilePhoto) {
      const uploadSettings = this.photoUploadService.photoUploadSettings;
      this.saveHeight = uploadSettings.saveHeight ? uploadSettings.saveHeight : Default.HEIGHT;
      this.saveWidth = uploadSettings.saveWidth ? uploadSettings.saveWidth : Default.WIDTH;
      this.qualityPercentage = Quality.MAXIMUM;
      this.aspectRatio = this.saveWidth / this.saveHeight;
    } else {    
      this.qualityPercentage = Quality.MINIMUM;
      this.aspectRatio = Default.LANDSCAPE;
    }
  }

  cropperIsReady(originalImage: Dimensions) {
    if (!this.profilePhoto) {
      this.aspectRatio = originalImage.width / originalImage.height;
      this.maintainAspectRatio = false;
    } 
    setTimeout(() => {
      this.cropperPosition = this.getCroppingCoordinates(originalImage);
    }, Default.DELAY);
    this.loadingService.closeSpinner();
  }

  imageCropped(croppedImage: ImageCroppedEvent) {
    this.croppedImageBase64 = croppedImage.base64;
    if (!this.profilePhoto) {
      if (croppedImage.width > croppedImage.height) {
        this.photoUploadService.orientation = Orientation.LANDSCAPE;
      } else {
        this.photoUploadService.orientation = Orientation.PORTRAIT;
      }
    } 
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

  private getCroppingCoordinates(originalImage: Dimensions): any {
    const length = (originalImage.width + originalImage.height) / Default.DIVIDER;
    return {
      x1: 0,
      y1: 0,
      x2: length,
      y2: length,
    };
  }
}
