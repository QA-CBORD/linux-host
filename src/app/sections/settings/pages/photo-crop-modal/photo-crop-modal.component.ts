import { Component, Input } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { ImageCroppedEvent, Dimensions } from 'ngx-image-cropper';
import { LoadingService } from '@core/service/loading/loading.service';
import { PhotoUploadService } from '../services/photo-upload.service';
import { PopoverCropComponent } from '../popover-photo-crop/popover-photo-crop.component';
import { ToastService } from '@core/service/toast/toast.service';

enum Default {
  HEIGHT = 170,
  WIDTH = 128,
  DELAY = 100,
  DIVIDER = 2,
  LANDSCAPE = 3 / 2,
}

enum Quality {
  MAXIMUM = 100,
  REGULAR = 85,
}

enum Tolerance {
  UPPER = 1.2,
  LOWER = 0.8,
}

export enum Orientation {
  PORTRAIT,
  LANDSCAPE,
  NONE,
}

const ORIGIN = 0;

@Component({
  templateUrl: './photo-crop-modal.component.html',
  styleUrls: ['./photo-crop-modal.component.scss'],
})
export class PhotoCropModalComponent {
  cropperPosition = { x1: ORIGIN, y1: ORIGIN, x2: ORIGIN, y2: ORIGIN };
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
    private readonly toastService: ToastService,
  ) {}


  ionViewWillEnter() {
    this.loadingService.showSpinner();
    if (this.isProfilePhoto()) {
      const uploadSettings = this.photoUploadService.photoUploadSettings;
      this.saveHeight = uploadSettings.saveHeight ? uploadSettings.saveHeight : Default.HEIGHT;
      this.saveWidth = uploadSettings.saveWidth ? uploadSettings.saveWidth : Default.WIDTH;
      this.qualityPercentage = Quality.MAXIMUM;
      this.aspectRatio = this.saveWidth / this.saveHeight;
    } else {
      this.qualityPercentage = Quality.REGULAR;
      this.aspectRatio = Default.LANDSCAPE;
    }
  }

  cropperIsReady(originalImage: Dimensions) {
    let width = originalImage.width;
    let height = originalImage.height;
    let divisor = null;
    if (this.isProfilePhoto()) {
      this.maintainAspectRatio = true;
      width = this.saveWidth;
      height = this.saveHeight;
      divisor = Default.DIVIDER;
    } else {
      this.maintainAspectRatio = false;
    }
    setTimeout(() => {
      this.cropperPosition = this.croppingCoordinates(width, height, divisor);
    }, Default.DELAY);
    this.loadingService.closeSpinner();
  }

  imageCropped(croppedImage: ImageCroppedEvent) {
    this.croppedImageBase64 = croppedImage.base64;
    this.setOrientation(croppedImage);
  }

  dismissModal(croppedImageBase64?: string) {
    this.modalController.dismiss({ croppedImageBase64 });
  }

  async loadImageFailed() {
    await this.toastService.showToast({ message: 'There was an issue loading your photo. Please try again' });
  }

  async showModal() {
    const modal = await this.popoverCtrl.create({
      cssClass: 'sc-popover',
      component: PopoverCropComponent,
    });
    await modal.present();
  }

  private croppingCoordinates(width: number, height: number, divisor = 1) {
    return {
      x1: ORIGIN,
      y1: ORIGIN,
      x2: width / divisor,
      y2: height / divisor,
    };
  }

  private setOrientation(croppedImage: ImageCroppedEvent) {
    if (croppedImage.width > croppedImage.height * Tolerance.UPPER) {
      this.photoUploadService.orientation = Orientation.LANDSCAPE;
    } else if (croppedImage.width < croppedImage.height * Tolerance.LOWER) {
      this.photoUploadService.orientation = Orientation.PORTRAIT;
    } else {
      this.photoUploadService.orientation = Orientation.NONE;
    }
  }

  private isProfilePhoto() {
    return this.profilePhoto;
  }
}
