import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HousingDashboardPage } from './housing-dashboard.page';

const imports = [CommonModule, FormsModule, IonicModule];
const declarations = [HousingDashboardPage];

@NgModule({
  imports,
  declarations,
})
export class HousingDashboardPageModule {}
