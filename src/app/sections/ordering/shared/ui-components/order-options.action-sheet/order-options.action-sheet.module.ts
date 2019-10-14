import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { OrderOptionsActionSheetComponent } from './order-options.action-sheet.component';
import { DeliveryAddressesModalModule } from '../delivery-addresses.modal/delivery-addresses.modal.module';

const declarations = [OrderOptionsActionSheetComponent];

@NgModule({
  declarations,
  exports: [OrderOptionsActionSheetComponent],
  entryComponents: [OrderOptionsActionSheetComponent],
  imports: [CommonModule, IonicModule, DeliveryAddressesModalModule],
})
export class OrderOptionsActionSheetModule {}
