import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AccountListComponent } from './account-list.component';
import { AccountComponent } from './account/account.component'
import { TransactionUnitsPipeModule } from '@shared/pipes';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    TransactionUnitsPipeModule
  ],
  providers: [],
  declarations: [AccountListComponent, AccountComponent],
  exports: [AccountListComponent]
})
export class AccountListModule { }
