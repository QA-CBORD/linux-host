import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { SavedAddressesComponent } from './saved-addresses.component';
import { SavedAddressesRoutingModule } from './saved-addresses.routing.module';

const imports = [CommonModule, SharedModule, IonicModule, SavedAddressesRoutingModule];
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
