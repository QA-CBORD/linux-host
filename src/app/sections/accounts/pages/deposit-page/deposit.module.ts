import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { DepositPageComponent } from './deposit-page.component';
import { DepositRoutingModule } from './deposit.routing.module';
import { DepositResolver } from './resolvers/deposit.resolver';
import { DepositService } from '@sections/accounts/services/deposit.service';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';
import { CreditCardTypeModule } from '@sections/accounts/shared/pipes/credit-card-type/credit-card-type.module';
import { ConfirmDepositPopoverComponent } from '@sections/accounts/shared/ui-components/confirm-deposit-popover';
import { ConfirmDepositPopoverModule } from '@sections/accounts/shared/ui-components/confirm-deposit-popover/confirm-deposit-popover.module';
import { DepositModalComponent } from '@sections/accounts/shared/ui-components/deposit-modal';
import { DepositModalModule } from '@sections/accounts/shared/ui-components/deposit-modal/deposit-modal.module';
import { TransactionUnitsPipeModule } from '@shared/pipes';
import { StButtonModule } from '@shared/ui-components/st-button/st-button.module';

const imports = [
  CommonModule,
  StHeaderModule,
  ReactiveFormsModule,
  CreditCardTypeModule,
  TransactionUnitsPipeModule,
  IonicModule.forRoot({
    scrollPadding: false,
    scrollAssist: true,
  }),
  DepositRoutingModule,
  ConfirmDepositPopoverModule,
  DepositModalModule,
  StButtonModule
];
const declarations = [DepositPageComponent];
const providers = [DepositResolver, DepositService];
const entryComponents = [ConfirmDepositPopoverComponent, DepositModalComponent];

@NgModule({
  declarations,
  imports: [
    imports,
  ],
  providers,
  entryComponents
})
export class DepositModule {}
