import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';
import { IonicModule } from '@ionic/angular';
import { PhotoUploadComponent } from '@sections/settings/pages/photo-upload/photo-upload.component';
import { PhotoUploadRoutingModule } from '@sections/settings/pages/photo-upload/photo-upload.routing.module';
import { DeleteModalComponent } from '@sections/settings/pages/delete-modal/delete-modal.component';
import { PhotoUploadResolver } from '@sections/settings/resolvers/photo-upload.resolver';
import { PhotoUploadService } from '@sections/settings/pages/services/photo-upload.service';
import { PhotoCropModalService } from '../services/photo-crop.service';
import { ImageCropperModule } from 'ngx-image-cropper';
import { PhotoCropModalComponent } from '../photo-crop-modal/photo-crop-modal.component';

const imports = [CommonModule, ImageCropperModule, StHeaderModule, IonicModule, PhotoUploadRoutingModule];
const declarations = [PhotoUploadComponent, DeleteModalComponent, PhotoCropModalComponent];
const entryComponents = [DeleteModalComponent, PhotoCropModalComponent];
const providers = [PhotoUploadResolver, PhotoUploadService, PhotoCropModalService];
@NgModule({
  declarations,
  imports,
  providers,
  entryComponents
})
export class PhotoUploadModule {
}
