import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { SettingsPage } from '@sections/settings/settings.page';
import { LOCAL_ROUTING } from '@sections/settings/settings.config';
import { PhotoUploadResolver } from './pages/photo-upload/resolvers/photo-upload.resolver';

const routes: Route[] = [
    {
        path: '',
        component: SettingsPage,
    },
    {
        path: LOCAL_ROUTING.photoUpload,
        loadChildren: './pages/photo-upload/photo-upload.module#PhotoUploadModule',
    },
];

const imports = [RouterModule.forChild(routes),];
const exports = [RouterModule];

@NgModule({ imports, exports })
export class SettingsRoutingModule {
}
