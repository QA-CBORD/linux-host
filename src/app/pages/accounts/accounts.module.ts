import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountsPage } from './accounts.page';
import { AccountsRoutingModule } from './accounts.routing.module';

const imports = [CommonModule, AccountsRoutingModule];
const declarations = [AccountsPage];

@NgModule({
  declarations,
  imports,
})
export class AccountsModule {}
