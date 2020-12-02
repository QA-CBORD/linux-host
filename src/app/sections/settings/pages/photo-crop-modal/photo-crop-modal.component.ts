import { Component, Input, OnInit} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-image-crop-modal',
  templateUrl: './photo-crop-modal.component.html',
  styleUrls: ['./photo-crop-modal.component.scss']
})
export class PhotoCropModalComponent implements OnInit {

  private croppedImageBase64 = '';

  @Input() imageBase64 = '';

  constructor(
      private modalController: ModalController
  ) { }

  ngOnInit() {
    //
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImageBase64 = event.base64;
  }

  dismissModal(croppedImageBase64?: string) {
    this.modalController.dismiss({croppedImageBase64});
  }
}
