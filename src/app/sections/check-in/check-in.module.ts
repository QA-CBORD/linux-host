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

const declarations = [
  CheckInPendingComponent,
  ScanCodeComponent,
  CheckInFailureComponent,
  CheckInFailureComponent,
  CheckInSuccessComponent,
];

@NgModule({
  declarations,
  entryComponents: declarations,

  imports: [
    CommonModule,
    // StHeaderModule,
    AddressHeaderFormatPipeModule,
    ModifyPrepTimeModule,
    IonicModule,
    StButtonModule,
  ],
})
export class CheckInModule {}
