import { NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SecureMessagePage } from './secure-message.page';
import { SecureMessagingService } from './service';
import { SecureMessagingApiService } from './service';
import { SecureMessageRoutingModule } from './secure-message-routing.module';
import { SecureMessagePopoverComponent } from './secure-message-popover';
import { SharedModule } from '../../shared/shared.module';
import { MessageDatePipe } from './pipes/message-date.pipe';
import { ConversationDatePipe } from './pipes/conversation-date.pipe';

const declarations = [
  SecureMessagePage,
  SecureMessagePopoverComponent,
  MessageDatePipe,
  ConversationDatePipe
];

const providers: Provider[] = [
  SecureMessagingService,
  SecureMessagingApiService,
];

const imports = [
  CommonModule,
  SharedModule,
  FormsModule,
  IonicModule,
  SecureMessageRoutingModule,
];

const entryComponents = [SecureMessagePopoverComponent];

@NgModule({ imports, providers, declarations, entryComponents })
export class SecureMessagePageModule {
}
