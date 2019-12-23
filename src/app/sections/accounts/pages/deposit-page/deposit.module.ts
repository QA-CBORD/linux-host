import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { DepositPageComponent } from './deposit-page.component';
import { DepositRoutingModule } from './deposit.routing.module';
import { AccountsSharedModule } from '../../shared/shared.module';
import { DepositResolver } from './resolvers/deposit.resolver';
import { DepositService } from '@sections/accounts/services/deposit.service';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';
import { TransactionUnitsPipeModule } from '@shared/pipes';

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
  imports: [
    imports,
    TransactionUnitsPipeModule,
  ],
  providers,
})
export class DepositModule {}
