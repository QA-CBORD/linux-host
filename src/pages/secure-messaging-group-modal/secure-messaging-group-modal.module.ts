import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SecureMessagingGroupModalPage } from './secure-messaging-group-modal';

@NgModule({
  declarations: [
    SecureMessagingGroupModalPage,
  ],
  imports: [
    IonicPageModule.forChild(SecureMessagingGroupModalPage),
  ],
})
export class SecureMessagingGroupModalPageModule {}
