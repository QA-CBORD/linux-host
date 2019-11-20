import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ConversationsTileComponent } from './conversations-tile.component';
import { SecureMessagingApiService, SecureMessagingService } from '@sections/secure-messaging';


const imports = [IonicModule, CommonModule];
const declarations = [ConversationsTileComponent,];
const exports = [ConversationsTileComponent];

@NgModule({
  declarations,
  imports,
  providers: [SecureMessagingService, SecureMessagingApiService],
  exports,
})
export class ConversationsTileModule { }
