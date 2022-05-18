import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ConversationsTileComponent } from './conversations-tile.component';
import { SecureMessagingApiService } from '@sections/secure-messaging';
import { SecureMessagingService } from './services/secure-messaging.service';
import { MessageDatePipeModule } from '@shared/pipes/message-date';
import { StConversationItemModule } from '@shared/ui-components';

const imports = [IonicModule, CommonModule, MessageDatePipeModule, StConversationItemModule];
const declarations = [ConversationsTileComponent];
const exports = [ConversationsTileComponent];

@NgModule({
  declarations,
  imports,
  providers: [SecureMessagingService, SecureMessagingApiService],
  exports,
})
export class ConversationsTileModule {}
