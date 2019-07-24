import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountsPage } from './accounts.page';
import { AccountsRoutingModule } from './accounts.routing.module';
import { SharedModule } from '../../shared/shared.module';
import { AccountsApiService } from './services/accounts.api.service';
import { AccountsService } from './services/accounts.service';
import { AccountsPageResolver } from './resolvers/accounts-page.resolver';
import { AccountsSharedModule } from './shared/shared.module';
import { FilterComponent } from './components/filter/filter.component';
import { FilterMenuComponent } from './components/filter/filter-menu/filter-menu.component';
import { AccountNamePipe } from './components/filter/pipes/account-name.pipe';
import { TimeRangePipe } from './components/filter/pipes/time-range.pipe';

const imports = [CommonModule, AccountsRoutingModule, SharedModule, AccountsSharedModule];
const declarations = [
  AccountsPage,
    FilterComponent,
    FilterMenuComponent
];
const entryComponents = [FilterMenuComponent];
const providers = [AccountsApiService, AccountsService, AccountsPageResolver];

@NgModule({
  declarations,
  imports,
  providers,
  entryComponents,
})
export class AccountsModule {
}
