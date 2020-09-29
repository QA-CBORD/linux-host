import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountDisplayPipe } from './account-display.pipe';
import { CreditCardTypePipe } from '../credit-card-type';

const declarations = [AccountDisplayPipe];

@NgModule({
  declarations,
  imports: [CommonModule],
  exports: declarations,
  providers: [CreditCardTypePipe]
})
export class AccountDisplayPipeModule {}
