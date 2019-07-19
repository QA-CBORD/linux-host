import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountsPage } from './accounts.page';
import { AccountsRoutingModule } from './accounts.routing.module';
import { SharedModule } from '../../shared/shared.module';
import { AccountsApiService } from './services/accounts.api.service';
import { AccountsService } from './services/accounts.service';
import { AccountsPageResolver } from './resolvers/accounts-page.resolver';
import { AccountsSharedModule } from './shared/shared.module';

const imports = [CommonModule, AccountsRoutingModule, SharedModule, AccountsSharedModule];
const declarations = [
  AccountsPage
];
const providers = [AccountsApiService, AccountsService, AccountsPageResolver];

@NgModule({
  declarations,
  imports,
  providers,
})
export class AccountsModule {
}
