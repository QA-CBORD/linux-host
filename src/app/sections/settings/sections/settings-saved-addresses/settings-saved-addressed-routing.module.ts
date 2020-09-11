import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { LOCAL_ROUTING as ORDERING_ROUTING } from '@sections/ordering/ordering.config'
import { SettingsSavedAddressesResolver } from './resolvers/settings-saved-addresses.resolver';
import { PATRON_NAVIGATION } from 'src/app/app.global';
import { SETTINGS_NAVIGATE } from '@sections/settings/settings.config';

const routes: Route[] = [
  {
    path: '',
    loadChildren: '../../../ordering/pages/saved-addresses/saved-addresses.module#SavedAddressesModule',
    resolve: {
      data: SettingsSavedAddressesResolver,
    },
    data: {relativeRoute: `${PATRON_NAVIGATION.settings}/${SETTINGS_NAVIGATE.address}`}
  },
  {
    path: ORDERING_ROUTING.addressEdit,
    loadChildren: '../../../ordering/pages/address-edit/address-edit.module#AddressEditPageModule',
  },
];

const imports = [RouterModule.forChild(routes)];
const exports = [RouterModule];

@NgModule({ imports, exports })
export class SettingsSavedAddressesRoutingModule {}
