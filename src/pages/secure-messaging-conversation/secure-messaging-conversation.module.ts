import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SecureMessagingConversationPage } from './secure-messaging-conversation';

@NgModule({
  declarations: [
    SecureMessagingConversationPage,
  ],
  imports: [
    IonicPageModule.forChild(SecureMessagingConversationPage),
  ],
})
export class SecureMessagingConversationPageModule {}
