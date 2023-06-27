import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ImageCropperModule } from 'ngx-image-cropper';
import { CommonModule } from '@angular/common';
import { PhotoCropModalComponent } from './photo-crop-modal.component';
import { PhotoCropModalService } from '../services/photo-crop.service';
import { PopoverCropComponent } from '../popover-photo-crop/popover-photo-crop.component';

@NgModule({
  imports: [CommonModule, IonicModule, ImageCropperModule],
  declarations: [PhotoCropModalComponent, PopoverCropComponent],
  providers: [PhotoCropModalService],
})
export class ImageCropModalModule {}
