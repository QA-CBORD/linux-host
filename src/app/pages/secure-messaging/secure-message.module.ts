import { NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SecureMessagePage } from './secure-message.page';
import { SecureMessagingService } from './service';
import { SecureMessagingApiService } from './service';
import { SecureMessageRoutingModule } from './secure-message-routing.module';

const declarations = [
    SecureMessagePage
];

const providers: Provider[] = [
    SecureMessagingService,
    SecureMessagingApiService
];

const imports = [
    CommonModule,
    FormsModule,
    IonicModule,
    SecureMessageRoutingModule
];

@NgModule({ imports, providers, declarations })
export class SecureMessagePageModule {
}
