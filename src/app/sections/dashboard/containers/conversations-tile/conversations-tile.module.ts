import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ConversationsTileComponent } from './conversations-tile.component';
import { MessageDatePipeModule } from '@shared/pipes/message-date';
import { StConversationItemModule } from '@shared/ui-components';
import { SecureMessagingApiService } from '@core/service/secure-messaging/secure-messaging-api.service';
import { SecureMessagingFacadeService } from '@core/facades/secure-messaging/secure-messaging.facade.service';

const imports = [IonicModule, CommonModule, MessageDatePipeModule, StConversationItemModule];
const declarations = [ConversationsTileComponent];


@NgModule({
  declarations,
  imports,
  providers: [SecureMessagingFacadeService, SecureMessagingApiService],
  exports: [ConversationsTileComponent],
})
export class ConversationsTileModule {}
