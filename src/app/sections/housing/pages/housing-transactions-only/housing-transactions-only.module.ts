import { NgModule } from '@angular/core';
import { HousingTransactionsOnlyComponent } from './housing-transactions-only.component';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';
import { CommonModule } from '@angular/common';
import { AccountDetailsRoutingModule } from '@sections/accounts/pages/account-details/account-details.routing.module';
import { TransactionsModule } from '@sections/accounts/shared/ui-components/transactions/transactions.module';
import { FilterModule } from '@sections/accounts/shared/ui-components/filter/filter.module';
import { IonicModule } from '@ionic/angular';
import { TransactionService } from '@sections/accounts/services/transaction.service';
import { TransactionsTileModule } from '@sections/dashboard/containers';

@NgModule({
  declarations: [HousingTransactionsOnlyComponent],
  imports: [
    CommonModule,
    AccountDetailsRoutingModule,
    TransactionsModule,
    FilterModule,
    StHeaderModule,
    IonicModule.forRoot({
      scrollPadding: false,
      scrollAssist: true,
    }),
    TransactionsTileModule
  ],
  exports: [HousingTransactionsOnlyComponent],
  providers: [TransactionService]
})
export class HousingTransactionsOnlyModule {}
