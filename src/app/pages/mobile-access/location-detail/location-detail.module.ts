import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { LocationDetailPage } from './location-detail.page';

const imports = [CommonModule, FormsModule, IonicModule];
const declarations = [LocationDetailPage];
const entryComponents = [LocationDetailPage];
@NgModule({
  imports,
  declarations,
  entryComponents,
})
export class LocationDetailPageModule {}
