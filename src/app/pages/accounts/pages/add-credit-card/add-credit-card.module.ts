import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { AddCreditCardComponent } from './add-credit-card.component';
import { AddCreditCardRoutingModule } from './add-credit-card.routing.module';
import { AddCreditCardService } from './services/add-credit-card.service';
import { SuccessPopoverComponent } from './components/success-popover/success-popover.component';

const imports = [CommonModule, SharedModule, IonicModule.forRoot({
  scrollPadding: false,
  scrollAssist: true,
}), AddCreditCardRoutingModule];
const declarations = [AddCreditCardComponent, SuccessPopoverComponent];
const providers = [AddCreditCardService];
const entryComponents = [SuccessPopoverComponent];

@NgModule({
  declarations,
  imports,
  providers,
  entryComponents,
})
export class AddCreditCardModule {}
