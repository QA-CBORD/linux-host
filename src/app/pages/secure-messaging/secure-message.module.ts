import { NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SecureMessagePage } from './secure-message.page';
import { SecureMessagingMainService } from './service';
import { SecureMessagingService } from './service';

const routes: Routes = [
    {
        path: '', component: SecureMessagePage
    }
];

const DECLARATIONS = [
    SecureMessagePage
];

const PROVIDERS: Provider[] = [
    SecureMessagingMainService,
    SecureMessagingService
];
const MODULES = [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
];

@NgModule({
    imports: MODULES,
    providers: PROVIDERS,
    declarations: DECLARATIONS,
})
export class SecureMessagePageModule {
}
