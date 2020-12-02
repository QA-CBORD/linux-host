import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ImageCropperModule } from 'ngx-image-cropper';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule, IonicModule, ImageCropperModule]
})
export class ImageCropModalModule {}
