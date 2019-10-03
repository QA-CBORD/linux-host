import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { DepositPageComponent } from './deposit-page.component';
import { DepositRoutingModule } from './deposit.routing.module';
import { AccountsSharedModule } from '../../shared/shared.module';
import { DepositResolver } from './resolvers/deposit.resolver';
import { DepositService } from './services/deposit.service';

const imports = [CommonModule, SharedModule, IonicModule, DepositRoutingModule, AccountsSharedModule];
const declarations = [DepositPageComponent];
const providers = [DepositResolver, DepositService]

@NgModule({
  declarations,
  imports,
  providers
})
export class DepositModule { }
