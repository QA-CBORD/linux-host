import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { SavedAddressesComponent } from '../saved-addresses';

const imports = [CommonModule, SharedModule, IonicModule];
const declarations = [SavedAddressesComponent];
const providers = [];
const entryComponents = [];

@NgModule({
  declarations,
  imports,
  providers,
  entryComponents,
})
export class FavoriteMerchantsModule {}
