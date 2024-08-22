import { NgModule } from '@angular/core';
import { PhotoUploadComponent } from '@sections/settings/pages/photo-upload/photo-upload.component';
import { PhotoUploadRoutingModule } from './photo-upload.routing.module';

@NgModule({
  imports: [PhotoUploadComponent, PhotoUploadRoutingModule],
})
export class PhotoUploadModule {}
