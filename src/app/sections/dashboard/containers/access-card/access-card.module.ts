import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { AccessCardComponent } from './access-card.component';
import { AccessCardService } from './services/access-card.service';

const imports = [IonicModule, CommonModule];
const declarations = [AccessCardComponent];
const providers = [AccessCardService];
const exports = [AccessCardComponent];

@NgModule({
  declarations,
  imports,
  providers,
  exports
})
export class AccessCardModule {}
