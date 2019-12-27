import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuReceivingFundsComponent } from './menu-receiving-funds/menu-receiving-funds.component';
import { AccountListComponent } from './accout-list/account-list.component';
import { AccountComponent } from './accout-list/account/account.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { TransactionItemComponent } from './transactions/transaction-item/transaction-item.component';
import { PipesModule } from '../pipes/pipes.module';
import { IonicModule } from '@ionic/angular';
import { DirectivesModule } from '../directives/directives.module';
import { FilterComponent } from './filter/filter.component';
import { FilterMenuComponent } from './filter/filter-menu/filter-menu.component';
import { ConfirmDepositPopoverComponent } from './confirm-deposit-popover/confirm-deposit-popover.component';
import { TimeRangePipe } from './filter/pipes/time-range.pipe';
import { AccountNamePipe } from './filter/pipes/account-name.pipe';
import { DepositModalComponent } from './deposit-modal/deposit-modal.component';
import { StPopoverLayoutModule } from '@shared/ui-components/st-popover-layout/st-popover-layout.module';


const declarations = [
  MenuReceivingFundsComponent,
  AccountListComponent,
  AccountComponent,
  TransactionsComponent,
  TransactionItemComponent,
  FilterComponent,
  FilterMenuComponent,
  TimeRangePipe,
  AccountNamePipe,
  ConfirmDepositPopoverComponent,
  DepositModalComponent,
];

@NgModule({
  declarations,
  imports: [CommonModule, PipesModule, DirectivesModule, IonicModule, StPopoverLayoutModule],
  exports: [...declarations, IonicModule],
  entryComponents: [FilterMenuComponent, ConfirmDepositPopoverComponent, DepositModalComponent],
})
export class UiComponentsModule { }
