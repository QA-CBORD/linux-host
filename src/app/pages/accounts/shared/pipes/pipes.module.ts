import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionUnitsPipe } from './transaction-units.pipe';

const declarations = [TransactionUnitsPipe];
@NgModule({
  declarations: [...declarations],
  imports: [CommonModule],
  exports: [...declarations],
})
export class PipesModule {}
