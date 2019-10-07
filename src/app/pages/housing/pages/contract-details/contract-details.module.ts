import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ContractDetailsRoutingModule } from './contract-details.routing.module';

import { ContractDetailsPage } from './contract-details.page';

const imports = [CommonModule, FormsModule, IonicModule, ContractDetailsRoutingModule];
const declarations = [ContractDetailsPage];

@NgModule({
  imports,
  declarations,
})
export class ContractDetailsPageModule {}
