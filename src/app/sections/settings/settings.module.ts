import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsRoutingModule } from './settings-routing.module';
import { IonicModule } from '@ionic/angular';
import { SettingsPage } from './settings.page';
import { PhotoUploadModule } from '@sections/settings/pages/photo-upload/photo-upload.module';
import { SettingsItemComponent } from './components/settings-item/settings-item.component';
import { SettingsFactoryService } from './services/settings-factory.service';
import { HTMLRendererModule } from '@shared/ui-components/html-renderer/html-renderer.module';
import { PhoneEmailModule } from '@shared/ui-components/phone-email/phone-email.module';
import { EditHomePageModalModule } from '@shared/ui-components/edit-home-page-modal/edit-home-page-modal.module';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module'

const imports = [
  CommonModule,
  IonicModule,
  SettingsRoutingModule,
  PhotoUploadModule,
  HTMLRendererModule,
  PhoneEmailModule,
  StHeaderModule, 
  EditHomePageModalModule,
];
const declarations = [SettingsPage, SettingsItemComponent];
const entryComponents = [];
const providers = [SettingsFactoryService];
@NgModule({
  declarations,
  imports,
  providers,
  entryComponents,
})
export class SettingsModule {
  constructor() {}
}