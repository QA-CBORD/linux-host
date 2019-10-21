import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { DepositPageComponent } from './deposit-page.component';
import { DepositRoutingModule } from './deposit.routing.module';
import { AccountsSharedModule } from '../../shared/shared.module';
import { DepositResolver } from './resolvers/deposit.resolver';
import { StHeaderModule } from '../../../../shared/ui-components/st-header/st-header.module';
import { DepositService } from './services/deposit.service';

const imports = [
  CommonModule,
  StHeaderModule,
  ReactiveFormsModule,
  IonicModule.forRoot({
    scrollPadding: false,
    scrollAssist: true,
  }),
  DepositRoutingModule,
  AccountsSharedModule,
];
const declarations = [DepositPageComponent];
const providers = [DepositResolver, DepositService];

@NgModule({
  declarations,
  imports,
  providers,
})
export class DepositModule {}
