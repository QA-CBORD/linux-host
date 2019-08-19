import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionUnitsPipe } from './transaction-units.pipe';
import { TransactionActionPipe } from './transaction-action.pipe';
import { PageNamePipe } from './page-name.pipe';
import { IconPathPipe } from './icon-path.pipe';
import { CreditCardTypePipe } from './credit-card-type.pipe';
import { CustomCurrencyPipe } from './custom-currency.pipe';
import { CurrencyPipe } from '@angular/common';

const declarations = [
  TransactionUnitsPipe,
  TransactionActionPipe,
  PageNamePipe,
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
