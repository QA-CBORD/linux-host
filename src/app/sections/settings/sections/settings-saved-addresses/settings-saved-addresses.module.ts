import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SettingsSavedAddressesRoutingModule } from './settings-saved-addressed-routing.module';
import { MerchantService } from '@sections/ordering';
import { OrderingService } from '@sections/ordering/services/ordering.service';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';
import { SettingsSavedAddressesResolver } from './resolvers/settings-saved-addresses.resolver';

const providers = [SettingsSavedAddressesResolver, MerchantService, OrderingService];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    IonicModule,
    SettingsSavedAddressesRoutingModule,
    StHeaderModule
  ],
  providers
})
export class SettingsSavedAddressesModule { }
