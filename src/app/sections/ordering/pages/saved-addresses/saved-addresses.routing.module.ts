import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SavedAddressesComponent } from './saved-addresses.component';

const routes: Routes = [
  {
    path: '',
    component: SavedAddressesComponent,
  },
];

const imports = [RouterModule.forChild(routes)];
const exports = [RouterModule];

@NgModule({ imports, exports })
export class SavedAddressesRoutingModule {}
