import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsRoutingModule } from './settings-routing.module';
import { IonicModule } from '@ionic/angular';
import { SettingsPage } from './settings.page';
import { PhotoUploadModule } from '@sections/settings/pages/photo-upload/photo-upload.module';


const imports = [CommonModule, IonicModule, SettingsRoutingModule, PhotoUploadModule];
const declarations = [SettingsPage ];
const entryComponents = [];
const providers = [];
@NgModule({
  declarations,
  imports,
  providers,
  entryComponents

})
export class SettingsModule {
  constructor() {
  }
}

