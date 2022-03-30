import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckInPendingComponent } from './components/check-in-pending/check-in-pending.component';
import { ScanCodeComponent } from './components/scan-code/scan-code.component';
import { CheckInFailureComponent } from './components/check-in-failure/check-in-failure.component';
import { IonicModule } from '@ionic/angular';
import { StButtonModule } from '@shared/ui-components/st-button';
import { AddressHeaderFormatPipeModule } from '@shared/pipes/address-header-format-pipe/address-header-format-pipe.module';
import { ModifyPrepTimeModule } from '@sections/ordering/shared/pipes/modify-prep-time';
import { CheckInSuccessComponent } from './components/check-in-success/check-in-success.component';
import { CheckingProcess } from './services/check-in-process-builder';
import { PriceUnitsResolverModule } from '@sections/ordering/shared/pipes/price-units-resolver/price-units-resolver.module';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';
import { CheckinRoutingModule } from './routing/check-in-routing.module';
import { CheckinSuccessResolver } from './resolver/check-in-success-resolver.component';
import { CheckinPendingResolver } from './resolver/check-in-pending.resolver';
import { PickCheckinModeComponent } from './components/pick-checkin-mode/pick-checkin-mode.component';
import { ScanCodeBackground } from './components/scan-code/background/scan-code-background.component';
import { TypeMessageModule } from '@sections/ordering/shared/pipes/type-message/type-message.pipe.module';
import { ConfirmModule } from '@shared/confirm-modal/confirm-modal.module';
import { StSuccesSummaryModule } from '@shared/ui-components/success-summary/st-success-summary.module';
import { RecentOrdersResolver } from '@sections/ordering/resolvers/recent-orders.resolver';

const declarations = [CheckInPendingComponent, PickCheckinModeComponent, CheckInPendingComponent, ScanCodeComponent, CheckInFailureComponent, CheckInSuccessComponent, ScanCodeBackground];

@NgModule({
  declarations,
  providers: [CheckingProcess,  CheckinSuccessResolver, CheckinPendingResolver, RecentOrdersResolver],
  entryComponents: [CheckInPendingComponent, PickCheckinModeComponent, ScanCodeComponent, CheckInFailureComponent],

  imports: [
    CommonModule,
    StHeaderModule,
    AddressHeaderFormatPipeModule,
    ModifyPrepTimeModule,
    IonicModule,
    PriceUnitsResolverModule,
    StButtonModule,
    CheckinRoutingModule,
    ConfirmModule,
    TypeMessageModule,
    StSuccesSummaryModule
  ],
  exports: [declarations],
})
export class CheckInModule {}
