import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';
import { IonicModule } from '@ionic/angular';
import { PhotoUploadComponent } from '@sections/settings/pages/photo-upload/photo-upload.component';
import { PhotoUploadRoutingModule } from '@sections/settings/pages/photo-upload/photo-upload.routing.module';

@NgModule({
  declarations: [PhotoUploadComponent],
  imports: [CommonModule, StHeaderModule, IonicModule, PhotoUploadRoutingModule],
  entryComponents: [],
})
export class PhotoUploadModule {}
