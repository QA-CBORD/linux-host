import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PhotoCropModalComponent } from '../photo-crop-modal/photo-crop-modal.component';

@Injectable()
export class PhotoCropModalService {
  constructor(public modalController: ModalController) {}

  async show(imageBase64: string): Promise<string | null> {
    const modal: HTMLIonModalElement = await this.modalController.create({
      component: PhotoCropModalComponent,
      componentProps: {
        imageBase64,
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
