import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionUnitsPipe } from './transaction-units.pipe';
import { TransactionActionPipe } from './transaction-action.pipe';
import { IconPathPipe } from './icon-path.pipe';
import { CreditCardTypePipe } from './credit-card-type.pipe';

const declarations = [TransactionUnitsPipe, TransactionActionPipe, IconPathPipe, CreditCardTypePipe];

@NgModule({
  declarations: [...declarations],
  imports: [CommonModule],
  exports: [...declarations],
})
export class PipesModule {}
