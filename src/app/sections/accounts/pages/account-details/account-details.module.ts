import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AccountDetailsComponent } from './account-details.component';
import { AccountDetailsRoutingModule } from './account-details.routing.module';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';
import { TransactionsModule } from '@sections/accounts/shared/ui-components/transactions/transactions.module';
import { FilterModule } from '@sections/accounts/shared/ui-components/filter/filter.module';
import { PlanNameComponent } from '@sections/accounts/shared/ui-components/plan-name/plan-name.component';

const declarations = [AccountDetailsComponent];
const imports = [
  CommonModule,
  AccountDetailsRoutingModule,
  TransactionsModule,
  FilterModule,
  StHeaderModule,
  IonicModule.forRoot({
    scrollPadding: false,
    scrollAssist: true,
  }),
  PlanNameComponent
];

@NgModule({
  declarations,
  imports,
})
export class AccountDetailsModule {}
