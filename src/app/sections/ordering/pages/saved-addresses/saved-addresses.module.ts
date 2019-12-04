import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { SavedAddressesComponent } from './saved-addresses.component';
import { SavedAddressesRoutingModule } from './saved-addresses.routing.module';
import { OrderAddressListModule } from '@sections/ordering/shared/ui-components/order-address-list/order-address-list.module';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';
import { AddEditAddressesModule } from '@sections/ordering/shared/ui-components/add-edit-addresses';


const imports = [CommonModule,
  IonicModule, SavedAddressesRoutingModule,
  StHeaderModule, OrderAddressListModule,
  AddEditAddressesModule];
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
