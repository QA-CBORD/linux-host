import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { OrderOptionsActionSheetComponent } from './order-options.action-sheet.component';
import { StDateTimePickerModule } from '../st-date-time-picker';
import { DeliveryAddressesModalModule } from '../delivery-addresses.modal';

const declarations = [OrderOptionsActionSheetComponent];

@NgModule({
  declarations,
  exports: [OrderOptionsActionSheetComponent],
  entryComponents: [OrderOptionsActionSheetComponent],
  imports: [CommonModule, IonicModule, DeliveryAddressesModalModule, StDateTimePickerModule],
})
export class OrderOptionsActionSheetModule { }
