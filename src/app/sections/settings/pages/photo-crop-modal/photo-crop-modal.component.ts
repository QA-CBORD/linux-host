import { Component, Input } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { ImageCroppedEvent} from 'ngx-image-cropper';
import { LoadingService } from '@core/service/loading/loading.service';
import { PhotoUploadService } from '../services/photo-upload.service';
import { PopoverCropComponent } from '../popover-photo-crop/popover-photo-crop.component';
@Component({
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
    private photoUploadService: PhotoUploadService,
    private readonly popoverCtrl: PopoverController
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

  async showModal(): Promise<void>  {
    console.log("Show modal called");
    const modal = await this.popoverCtrl.create({
      component: PopoverCropComponent
    });
    modal.onDidDismiss();
    await modal.present();
  }
}
