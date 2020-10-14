import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { SettingsPage } from '@sections/settings/settings.page';
import { LOCAL_ROUTING, SETTINGS_NAVIGATE } from '@sections/settings/settings.config';
import { PhotoUploadResolver } from './resolvers/photo-upload.resolver';

const routes: Route[] = [
  {
    path: '',
    component: SettingsPage,
  },
  {
    path: LOCAL_ROUTING.photoUpload,
    loadChildren: './pages/photo-upload/photo-upload.module#PhotoUploadModule',
  },
  {
    path: SETTINGS_NAVIGATE.address,
    loadChildren: './sections/settings-saved-addresses/settings-saved-addresses.module#SettingsSavedAddressesModule',
  },
  {
    path: SETTINGS_NAVIGATE.lostCard,
    loadChildren: './pages/report-card/report-card.module#ReportCardModule',
  },
];

const imports = [RouterModule.forChild(routes)];
const exports = [RouterModule];

@NgModule({ imports, exports })
export class SettingsRoutingModule {}
