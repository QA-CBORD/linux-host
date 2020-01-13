import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { OrderOptionsActionSheetComponent } from './order-options.action-sheet.component';
import { StDateTimePickerModule } from '../st-date-time-picker';
import { DeliveryAddressesModalModule } from '../delivery-addresses.modal';
import { StButtonModule } from '@shared/ui-components/st-button/st-button.module';

const declarations = [OrderOptionsActionSheetComponent];

@NgModule({
  declarations,
  exports: [OrderOptionsActionSheetComponent],
  entryComponents: [OrderOptionsActionSheetComponent],
  imports: [CommonModule, IonicModule, DeliveryAddressesModalModule, StDateTimePickerModule, StButtonModule],
})
export class OrderOptionsActionSheetModule { }
