import { NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SecureMessagePage } from './secure-message.page';
import { SecureMessageRoutingModule } from './secure-message-routing.module';
import { SecureMessagePopoverComponent } from './secure-message-popover';
import { SegureMessageChatPageComponent } from './pages/segure-message-chat.page/segure-message-chat.page.component';
import { StopPropagationModule } from '@shared/directives/stop-propogation/stop-propagation.module';
import { StPopoverLayoutModule } from '@shared/ui-components/st-popover-layout/st-popover-layout.module';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';
import { MessageDatePipeModule } from '@shared/pipes/message-date';
import { RouterModule } from '@angular/router';
import { StConversationItemModule } from '@shared/ui-components';
import { SecureMessagingFacadeService } from '@core/facades/secure-messaging/secure-messaging.facade.service';
import { SecureMessagingApiService } from '@core/service/secure-messaging/secure-messaging-api.service';

const declarations = [SecureMessagePage, SegureMessageChatPageComponent, SecureMessagePopoverComponent];

const providers: Provider[] = [ SecureMessagingFacadeService, SecureMessagingApiService];

const imports = [
  CommonModule,
  FormsModule,
  IonicModule,
  RouterModule,
  SecureMessageRoutingModule,
  StopPropagationModule,
  StPopoverLayoutModule,
  StHeaderModule,
  MessageDatePipeModule,
  StConversationItemModule
];


@NgModule({ imports, providers, declarations })
export class SecureMessagePageModule {}
