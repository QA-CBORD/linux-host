import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ImageCropperModule } from 'ngx-image-cropper';
import { CommonModule } from '@angular/common';
import { PhotoCropModalComponent } from './photo-crop-modal.component';
import { PhotoCropModalService } from '../services/photo-crop.service';

@NgModule({
  imports: [CommonModule, IonicModule, ImageCropperModule],
  declarations: [PhotoCropModalComponent],
  providers: [PhotoCropModalService],
  entryComponents: [PhotoCropModalComponent]
})
export class ImageCropModalModule {}
