import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { IconPathModule } from '../../pipes/icon-path/icon-path.module';
import { TransactionsComponent } from './transactions.component';
import { TransactionItemComponent } from './transaction-item/transaction-item.component';
import { IsDividerAppearDirectiveModule } from '../../directives/is-divider-appear/is-divider-appear.module';
import { TransactionUnitsPipeModule, TransactionActionPipeModule } from '@shared/pipes';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    IconPathModule,
    TransactionUnitsPipeModule,
    TransactionActionPipeModule,
    IsDividerAppearDirectiveModule
  ],
  providers: [CurrencyPipe],
  declarations: [TransactionsComponent, TransactionItemComponent],
  exports: [TransactionsComponent]
})
export class TransactionsModule { }
