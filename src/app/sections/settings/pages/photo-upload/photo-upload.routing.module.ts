import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhotoUploadComponent } from '@sections/settings/pages/photo-upload/photo-upload.component';
import { photoUploadResolver } from '@sections/settings/resolvers/photo-upload.resolver';

const routes: Routes = [
  {
    path: '',
    component: PhotoUploadComponent,
    resolve: { data: photoUploadResolver },
  },
];

const imports = [RouterModule.forChild(routes)];
const exports = [RouterModule];

@NgModule({ imports, exports })
export class PhotoUploadRoutingModule {}
