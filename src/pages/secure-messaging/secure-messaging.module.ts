import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SecureMessagingPage } from './secure-messaging';

@NgModule({
  declarations: [
    SecureMessagingPage,
  ],
  imports: [
    IonicPageModule.forChild(SecureMessagingPage),
  ],
})
export class SecureMessagingPageModule {}
