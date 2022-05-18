import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConversationItemComponent } from './conversation-item.component';
import { IonicModule } from '@ionic/angular';
import { MessageDatePipeModule } from '@shared/pipes/message-date';

@NgModule({
  declarations: [ConversationItemComponent],
  exports: [ConversationItemComponent],
  imports: [
    CommonModule,
    IonicModule,
    MessageDatePipeModule
  ]
})
export class StConversationItemModule { }
