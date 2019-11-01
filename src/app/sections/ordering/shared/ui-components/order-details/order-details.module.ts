import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderDetailsComponent } from '@sections/ordering';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { TypeMessagePipe } from './type-message.pipe';
import { StDateTimePickerModule } from '@sections/ordering/shared/ui-components/st-date-time-picker/st-date-time-picker.module';
import { DeliveryAddressesModalModule } from '@sections/ordering/shared/ui-components/delivery-addresses.modal/delivery-addresses.modal.module';

const declarations = [OrderDetailsComponent, TypeMessagePipe];

@NgModule({
  declarations,
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    StDateTimePickerModule,
    DeliveryAddressesModalModule
  ],
  exports: [OrderDetailsComponent],
})
export class OrderDetailsModule { }
