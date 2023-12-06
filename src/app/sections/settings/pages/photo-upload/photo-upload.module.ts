import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';
import { IonicModule } from '@ionic/angular';
import { PhotoUploadComponent } from '@sections/settings/pages/photo-upload/photo-upload.component';
import { PhotoUploadRoutingModule } from '@sections/settings/pages/photo-upload/photo-upload.routing.module';
import { DeleteModalComponent } from '@sections/settings/pages/delete-modal/delete-modal.component';
import { ImageCropModalModule } from '../photo-crop-modal/photo-crop.module';
import { TranslateModule } from '@ngx-translate/core';

const imports = [
  CommonModule,
  StHeaderModule,
  IonicModule,
  PhotoUploadRoutingModule,
  ImageCropModalModule,
  TranslateModule,
];
const declarations = [PhotoUploadComponent, DeleteModalComponent];

@NgModule({
  declarations,
  imports,
})
export class PhotoUploadModule {}
