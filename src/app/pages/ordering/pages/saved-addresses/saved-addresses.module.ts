import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { SavedAddressesComponent } from './saved-addresses.component';
import { SavedAddressesRoutingModule } from './saved-addresses.routing.module';
import { OrderAddressListModule } from '../../shared/ui-components/order-address-list/order-address-list.module';


const imports = [CommonModule, SharedModule, IonicModule, SavedAddressesRoutingModule, OrderAddressListModule];
const declarations = [SavedAddressesComponent];
const providers = [];
const entryComponents = [];

@NgModule({
  declarations,
  imports,
  providers,
  entryComponents,
})
export class SavedAddressesModule { }
