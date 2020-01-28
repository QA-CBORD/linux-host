import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { BackButtonModule } from '@shared/ui-components/back-button/back-button.module';
import { PageTitleModule } from '../../page-title/page-title.module';
import { RoomsSwitchModule } from '../../rooms-switch/rooms-switch.module';
import { FavoritesRoutingModule } from './favorites.routing.module';

import { FavoritesPage } from './favorites.page';

export const imports = [
  CommonModule,
  IonicModule,
  FavoritesRoutingModule,
  BackButtonModule,
  PageTitleModule,
  RoomsSwitchModule,
];
export const declarations = [FavoritesPage];

@NgModule({
  imports,
  declarations,
})
export class FavoritesPageModule {}
