import { NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SecureMessagePage } from './secure-message.page';
import { SecureMessagingMainService } from './service';
import { SecureMessagingService } from './service';
import { SecureMessageRoutingModule } from './secure-message-routing.module';

const declarations = [
    SecureMessagePage
];

const providers: Provider[] = [
    SecureMessagingMainService,
    SecureMessagingService
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
