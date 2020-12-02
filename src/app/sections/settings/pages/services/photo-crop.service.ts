import {Injectable} from '@angular/core';
import {ModalController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class PhotoCropModalService {

  constructor(
      public modalController: ModalController,
  ) { }

  async show(imageBase64: string): Promise<string | null> {
    // Lazy load the image crop modal (an Angular Ivy feature)
    const { PhotoCropModalComponent } = await import(`../photo-crop-modal/photo-crop-modal.component`);

    const modal: HTMLIonModalElement = await this.modalController.create({
      component: PhotoCropModalComponent,
      componentProps: {
        imageBase64
      },
    });

    await modal.present();

    const result = await modal.onWillDismiss();

    if (result.data && result.data.croppedImageBase64) {
      return result.data.croppedImageBase64;
    } else {
      return null;
    }
  }
}