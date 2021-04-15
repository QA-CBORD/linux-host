import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuestDepositsRoutingModule } from './guest-deposits.routing.module';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';
import { IonicModule } from '@ionic/angular';
import { IdentifyRecipientComponent } from './components/identify-recipient/identify-recipient.component';
import { StButtonModule } from '@shared/ui-components/st-button';
import { StInputFloatingLabelModule } from '@shared/ui-components/st-input-floating-label/st-input-floating-label.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GuestDepositsService } from '../services/guest-deposits.service';

@NgModule({
  declarations: [IdentifyRecipientComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GuestDepositsRoutingModule,
    IonicModule,
    StHeaderModule,
    StInputFloatingLabelModule,
    StButtonModule,
  ],
  providers: [GuestDepositsService]
})
export class GuestDepositsModule {}
