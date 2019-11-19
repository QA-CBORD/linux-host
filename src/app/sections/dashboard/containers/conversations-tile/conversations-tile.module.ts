import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ConversationsTileComponent } from './conversations-tile.component';
import { SecureMessagingService } from './services/secure-messaging.service';


const imports = [IonicModule, CommonModule];
const declarations = [ConversationsTileComponent,];
const exports = [ConversationsTileComponent];

@NgModule({
  declarations,
  imports,
  providers: [SecureMessagingService],
  exports,
})
export class ConversationsTileModule { }
