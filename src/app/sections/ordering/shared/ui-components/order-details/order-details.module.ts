import { ModifyPrepTimeModule } from '@sections/ordering/shared/pipes/modify-prep-time';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderDetailsComponent } from '@sections/ordering';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { TypeMessagePipe } from './pipes/type-message.pipe';
import { StDateTimePickerModule } from '@sections/ordering/shared/ui-components/st-date-time-picker/st-date-time-picker.module';
import { DeliveryAddressesModalModule } from '@sections/ordering/shared/ui-components/delivery-addresses.modal/delivery-addresses.modal.module';
import { PriceUnitsResolverModule } from '@sections/ordering/shared/pipes/price-units-resolver/price-units-resolver.module';
import { CreditCardTypePipe } from '@sections/accounts/shared/pipes/credit-card-type/credit-card-type.pipe';
import { AccountTypeResolverPipe } from './pipes/account-type-resolver.pipe';
import { PriceUnitsResolverPipe } from '@sections/ordering/shared/pipes/price-units-resolver/price-units-resolver.pipe';
import { AddressHeaderFormatPipeModule } from '@shared/pipes/address-header-format-pipe/address-header-format-pipe.module';
import { StTextareaFloatingLabelModule } from '@shared/ui-components/st-textarea-floating-label/st-textarea-floating-label.module';
import { AccessibleSelectModule } from '@shared/accessibility/directives/accessible-select.module';
import { AccountDisplayPipe } from '@sections/accounts/shared/pipes/account-display/account-display.pipe';
import { StInputFloatingLabelModule } from '@shared/ui-components/st-input-floating-label/st-input-floating-label.module';
import { ModalsService } from '@core/service/modals/modals.service';

const declarations = [OrderDetailsComponent, TypeMessagePipe, AccountTypeResolverPipe];

@NgModule({
  declarations,
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    StDateTimePickerModule,
    DeliveryAddressesModalModule,
    PriceUnitsResolverModule,
    ModifyPrepTimeModule,
    AddressHeaderFormatPipeModule,
    StTextareaFloatingLabelModule,
    AccessibleSelectModule,
    StInputFloatingLabelModule,
  ],
  exports: [OrderDetailsComponent],
  providers: [CreditCardTypePipe, PriceUnitsResolverPipe, AccountDisplayPipe, ModalsService],
})
export class OrderDetailsModule {}
