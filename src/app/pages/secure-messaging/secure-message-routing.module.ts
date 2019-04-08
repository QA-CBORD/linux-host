import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecureMessagePage } from './secure-message.page';

const routes: Routes = [
    {
        path: '', component: SecureMessagePage
    }
];

const imports = [RouterModule.forChild(routes)];
const exports = [RouterModule];


@NgModule({ imports, exports })
export class SecureMessageRoutingModule {
}
