import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhotoUploadComponent } from '@sections/settings/pages/photo-upload/photo-upload.component';


const routes: Routes = [
  {
    path: '',
    component: PhotoUploadComponent,
  },
];

const imports = [RouterModule.forChild(routes)];
const exports = [RouterModule];

@NgModule({ imports, exports })
export class PhotoUploadRoutingModule { }
