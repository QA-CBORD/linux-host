import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { RoomsComponent } from './rooms.component';

export const imports = [CommonModule, IonicModule, RouterModule];
export const declarations = [RoomsComponent];

@NgModule({
  imports,
  exports: declarations,
  declarations,
})
export class RoomsModule {}