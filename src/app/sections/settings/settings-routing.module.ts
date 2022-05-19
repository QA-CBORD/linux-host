import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { SettingsPage } from '@sections/settings/settings.page';
import { LOCAL_ROUTING, SETTINGS_NAVIGATE } from '@sections/settings/settings.config';

const routes: Route[] = [
  {
    path: '',
    component: SettingsPage,
  },
  {
    path: LOCAL_ROUTING.photoUpload,
    loadChildren: () => import('./pages/photo-upload/photo-upload.module').then(m => m.PhotoUploadModule),
  },
  {
    path: SETTINGS_NAVIGATE.address,
    loadChildren: () => import('./sections/settings-saved-addresses/settings-saved-addresses.module').then(m => m.SettingsSavedAddressesModule),
  },
  {
    path: SETTINGS_NAVIGATE.lostCard,
    loadChildren: () => import('./pages/report-card/report-card.module').then(m => m.ReportCardModule),
  },
];

const imports = [RouterModule.forChild(routes)];
const exports = [RouterModule];

@NgModule({ imports, exports })
export class SettingsRoutingModule {}
