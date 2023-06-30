import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { OrderOptionsActionSheetComponent } from './order-options.action-sheet.component';
import { StDateTimePickerModule } from '../st-date-time-picker';
import { DeliveryAddressesModalModule } from '../delivery-addresses.modal';
import { StButtonModule } from '@shared/ui-components/st-button/st-button.module';
import { AddressHeaderFormatPipeModule } from '@shared/pipes/address-header-format-pipe/address-header-format-pipe.module';
import { AccessibilityService } from '@shared/accessibility/services/accessibility.service';
import { AddressHeaderFormatPipe } from '@shared/pipes/address-header-format-pipe';

const declarations = [OrderOptionsActionSheetComponent];

@NgModule({
  declarations,
  exports: [OrderOptionsActionSheetComponent],
  imports: [CommonModule, IonicModule, DeliveryAddressesModalModule, StDateTimePickerModule, StButtonModule, AddressHeaderFormatPipeModule],
  providers: [AccessibilityService, AddressHeaderFormatPipe]
})
export class OrderOptionsActionSheetModule { }
