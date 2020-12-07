import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';
import { IonicModule } from '@ionic/angular';
import { PhotoUploadComponent } from '@sections/settings/pages/photo-upload/photo-upload.component';
import { PhotoUploadRoutingModule } from '@sections/settings/pages/photo-upload/photo-upload.routing.module';
import { DeleteModalComponent } from '@sections/settings/pages/delete-modal/delete-modal.component';
import { PhotoUploadResolver } from '@sections/settings/resolvers/photo-upload.resolver';
import { PhotoUploadService } from '@sections/settings/pages/services/photo-upload.service';
import { ImageCropModalModule } from '../photo-crop-modal/photo-crop.module';

const imports = [CommonModule, StHeaderModule, IonicModule, PhotoUploadRoutingModule, ImageCropModalModule];
const declarations = [PhotoUploadComponent, DeleteModalComponent];
const entryComponents = [DeleteModalComponent];
const providers = [PhotoUploadResolver, PhotoUploadService];

@NgModule({
  declarations,
  imports,
  providers,
  entryComponents
})
export class PhotoUploadModule {
}
