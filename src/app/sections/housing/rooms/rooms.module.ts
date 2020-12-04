import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { RoomsComponent } from './rooms.component';
import { RoomSelectionListComponent } from '@sections/housing/rooms/room-selection-list/room-selection-list.component';

export const imports = [CommonModule, IonicModule, RouterModule];
export const declarations = [RoomsComponent];

@NgModule({
  imports,
  exports: declarations,
  declarations: [
    declarations,
    RoomSelectionListComponent,
  ],
})
export class RoomsModule {}
