import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { AddToFavoriteComponent } from './add-to-favorite.component';

export const imports = [CommonModule, IonicModule];
export const declarations = [AddToFavoriteComponent];

@NgModule({
  imports,
  exports: declarations,
  declarations,
})
export class AddToFavoriteModule {}
