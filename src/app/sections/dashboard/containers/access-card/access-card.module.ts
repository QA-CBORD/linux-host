import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AccessCardComponent } from './access-card.component';
import { AccessCardService } from './services/access-card.service';

const imports = [IonicModule, CommonModule];
const declarations = [AccessCardComponent];
const providers = [AccessCardService];

@NgModule({
  imports,
  providers,
  declarations,
  exports : [AccessCardComponent]
})
export class AccessCardModule {

}
