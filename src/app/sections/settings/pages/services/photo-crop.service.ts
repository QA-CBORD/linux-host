import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PhotoCropModalComponent } from '../photo-crop-modal/photo-crop-modal.component';
import { PhotoType } from './photo-upload.service';

@Injectable()
export class PhotoCropModalService {
  constructor(public modalController: ModalController) {}

  async show(imageBase64: string, photoType: PhotoType): Promise<string | null> {
    const profilePhoto = photoType === PhotoType.GOVT_ID_FRONT || photoType === PhotoType.GOVT_ID_BACK ? false : true;
    const modal = await this.modalController.create({
      component: PhotoCropModalComponent,
      componentProps: {
        imageBase64,
        profilePhoto
      },
    });

    await modal.present();

    const croppedImaged = await modal.onWillDismiss();
    if (croppedImaged.data && croppedImaged.data.croppedImageBase64) {
      return croppedImaged.data.croppedImageBase64;
    } else {
      return null;
    }
  }
}
