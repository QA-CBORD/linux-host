import { Component, Input } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { ImageCroppedEvent, Dimensions } from 'ngx-image-cropper';
import { LoadingService } from '@core/service/loading/loading.service';
import { PhotoUploadService, Orientation } from '../services/photo-upload.service';
import { PopoverCropComponent } from '../popover-photo-crop/popover-photo-crop.component';
import { ToastService } from '@core/service/toast/toast.service';

const defaultHeight = 170;
const defaultWidth = 128;
const photoCropDelay = 100;
const maximumQuality = 100;
const reducedQuality = 85;
const sixPart = 6;
const defaultLandscape = 3 / 2;

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
      this.saveHeight = uploadSettings.saveHeight ? uploadSettings.saveHeight : defaultHeight;
      this.saveWidth = uploadSettings.saveWidth ? uploadSettings.saveWidth : defaultWidth;
      this.qualityPercentage = maximumQuality;
      this.aspectRatio = this.saveWidth / this.saveHeight;
    } else {    
      this.qualityPercentage = reducedQuality;
      this.aspectRatio = defaultLandscape;
    }
  }

  cropperIsReady(originalImage: Dimensions) {
    if (!this.profilePhoto) {
      this.aspectRatio = originalImage.width / originalImage.height;
    } 
    setTimeout(() => {
      this.cropperPosition = this.getCroppingCoordinates(originalImage);
    }, photoCropDelay);
    this.loadingService.closeSpinner();
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImageBase64 = event.base64;
    if (!this.profilePhoto) {
      if (event.width > event.height) {
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
    const length = (originalImage.width + originalImage.height) / sixPart;
    return {
      x1: 0,
      y1: 0,
      x2: length,
      y2: length,
    };
  }
}
