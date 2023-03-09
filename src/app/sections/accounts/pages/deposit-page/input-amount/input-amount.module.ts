import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TransactionUnitsPipeModule } from '@shared/pipes';
import { AccountDisplayPipeModule } from '@sections/accounts/shared/pipes/account-display/account-display.module';
import { InputAmountComponent } from './input-amount.component';
import { ReactiveFormsModule } from '@angular/forms';

const imports = [
  CommonModule,
  AccountDisplayPipeModule,
  TransactionUnitsPipeModule,
  IonicModule.forRoot({
    scrollPadding: false,
    scrollAssist: true,
  }),
  ReactiveFormsModule
];
const declarations = [InputAmountComponent];

@NgModule({
  declarations,
  imports: [imports],
  exports: [InputAmountComponent]
})

export class StInputAmountModule {}
