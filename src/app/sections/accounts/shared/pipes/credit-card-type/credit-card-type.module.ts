import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreditCardTypePipe } from './credit-card-type.pipe';

const declarations = [CreditCardTypePipe];

@NgModule({
  declarations,
  imports: [CommonModule],
  exports: declarations,
})
export class CreditCardTypePipeModule {}
