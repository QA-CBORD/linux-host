import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconPathPipe } from './icon-path.pipe';
import { CreditCardTypePipe } from './credit-card-type.pipe';
import { CustomCurrencyPipe } from './custom-currency.pipe';
import { CurrencyPipe } from '@angular/common';

const declarations = [
  IconPathPipe,
  CreditCardTypePipe,
  CustomCurrencyPipe,
];

@NgModule({
  declarations: [...declarations],
  imports: [CommonModule],
  exports: [...declarations],
  providers: [CurrencyPipe],
})
export class PipesModule {}
