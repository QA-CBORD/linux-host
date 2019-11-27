import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ConversationsTileComponent } from './conversations-tile.component';
import { SecureMessagingApiService } from '@sections/secure-messaging';
import { SecureMessagingService } from './services/secure-messaging.service';
import { MessageDatePipe } from '@sections/secure-messaging/pipes/message-date.pipe';

const imports = [IonicModule, CommonModule];
const declarations = [ConversationsTileComponent, MessageDatePipe];
const exports = [ConversationsTileComponent];

@NgModule({
  declarations,
  imports,
  providers: [SecureMessagingService, SecureMessagingApiService],
  exports,
})
export class ConversationsTileModule {}
