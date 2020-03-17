import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { SignContractComponent } from './sign-contract.component';

export const declarations = [SignContractComponent];
export const imports = [CommonModule, IonicModule];

@NgModule({
  declarations,
  imports,
  exports: declarations,
})
export class SignContractModule {}
