import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountsPage } from './accounts.page';
import { AccountsRoutingModule } from './accounts.routing.module';
import { SharedModule } from '../../shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { MenuReceivingFundsComponent } from './components/menu-receiving-funds/menu-receiving-funds.component';
import { AccountsApiService } from './services/accounts.api.service';
import { AccountsService } from './services/accounts.service';
import { AccountsPageResolver } from './resolvers/accounts-page.resolver';
import { PageNamePipe } from './components/menu-receiving-funds/page-name.pipe';
import { AccountListComponent } from './components/accout-list/account-list.component';

const imports = [CommonModule, AccountsRoutingModule, SharedModule, IonicModule];
const declarations = [AccountsPage, MenuReceivingFundsComponent, PageNamePipe, AccountListComponent];
const providers = [AccountsApiService, AccountsService, AccountsPageResolver];

@NgModule({
  declarations,
  imports,
  providers,
})
export class AccountsModule {}
