import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';

import { AddCreditCardComponent } from './add-credit-card.component';
import { AddCreditCardRoutingModule } from './add-credit-card.routing.module';
import { AddCreditCardService } from './services/add-credit-card.service';
import { SuccessPopoverComponent } from './components/success-popover/success-popover.component';
import { StPopoverLayoutModule } from '@shared/ui-components/st-popover-layout/st-popover-layout.module';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';
import { StInputFloatingLabelModule } from '@shared/ui-components/st-input-floating-label/st-input-floating-label.module';
import { StButtonModule } from '@shared/ui-components/st-button';

const imports = [
  CommonModule,
  ReactiveFormsModule,
  StPopoverLayoutModule,
  StHeaderModule,
  StInputFloatingLabelModule,
  IonicModule.forRoot({
  scrollPadding: false,
  scrollAssist: true,
}), AddCreditCardRoutingModule,
  StButtonModule
  ];
const declarations = [AddCreditCardComponent, SuccessPopoverComponent];
const providers = [AddCreditCardService];

@NgModule({
  declarations,
  imports,
  providers,
})
export class AddCreditCardModule {}
