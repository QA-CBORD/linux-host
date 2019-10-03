import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { AccountDetailsComponent } from './account-details.component';
import { AccountDetailsRoutingModule } from './account-details.routing.module';
import { AccountsSharedModule } from '../../shared/shared.module';

const declarations = [AccountDetailsComponent];
const imports = [CommonModule, SharedModule, AccountDetailsRoutingModule, IonicModule, AccountsSharedModule];

@NgModule({
  declarations,
  imports,
})
export class AccountDetailsModule {}
