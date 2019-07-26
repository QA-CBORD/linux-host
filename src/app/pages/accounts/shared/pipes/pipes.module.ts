import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionUnitsPipe } from './transaction-units.pipe';
import { TransactionActionPipe } from './transaction-action.pipe';
import { PageNamePipe } from './page-name.pipe';
import { IconPathPipe } from './icon-path.pipe';

const declarations = [TransactionUnitsPipe, TransactionActionPipe, PageNamePipe, IconPathPipe];

@NgModule({
  declarations: [...declarations],
  imports: [CommonModule],
  exports: [...declarations],
})
export class PipesModule {}
