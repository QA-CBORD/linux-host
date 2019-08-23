import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { AccountsSharedModule } from '../../shared/shared.module';
import { AddCreditCardComponent } from './add-credit-card.component';
import { AddCreditCardRoutingModule } from './add-credit-card.routing.module';

const imports = [CommonModule, SharedModule, IonicModule, AddCreditCardRoutingModule, AccountsSharedModule];
const declarations = [AddCreditCardComponent];
const providers = []

@NgModule({
  declarations,
  imports,
  providers
})
export class AddCreditCardModule { }
