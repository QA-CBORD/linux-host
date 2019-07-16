import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionUnitsPipe } from './transaction-units.pipe';
import { TransactionActionPipe } from './transaction-action.pipe';

const declarations = [TransactionUnitsPipe, TransactionActionPipe];
@NgModule({
  declarations: [...declarations],
  imports: [CommonModule],
  exports: [...declarations],
})
export class PipesModule {}
