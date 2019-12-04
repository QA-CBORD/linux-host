import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderDetailsComponent } from '@sections/ordering';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { TypeMessagePipe } from './pipes/type-message.pipe';
import { StDateTimePickerModule } from '@sections/ordering/shared/ui-components/st-date-time-picker/st-date-time-picker.module';
import { DeliveryAddressesModalModule } from '@sections/ordering/shared/ui-components/delivery-addresses.modal/delivery-addresses.modal.module';
import { AddressAsStringPipe } from './address-as-string.pipe';
import { PriceUnitsResolverModule } from '@sections/ordering/shared/pipes/price-units-resolver/price-units-resolver.module';
import { CreditCardTypePipe } from '@sections/accounts/shared/pipes/credit-card-type.pipe';
import { AccountTypeResolverPipe } from './pipes/account-type-resolver.pipe';
import { PriceUnitsResolverPipe } from '@sections/ordering/shared/pipes/price-units-resolver/price-units-resolver.pipe';

const declarations = [OrderDetailsComponent, TypeMessagePipe, AddressAsStringPipe, AccountTypeResolverPipe];

@NgModule({
  declarations,
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    StDateTimePickerModule,
    DeliveryAddressesModalModule,
    PriceUnitsResolverModule
  ],
  exports: [OrderDetailsComponent],
  providers: [CreditCardTypePipe, PriceUnitsResolverPipe]
})
export class OrderDetailsModule { }
