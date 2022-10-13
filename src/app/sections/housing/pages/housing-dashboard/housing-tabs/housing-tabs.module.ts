import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HousingTabsComponent } from './housing-tabs.component';
import { HousingTabComponent } from './housing-tab/housing-tab.component';
const imports = [CommonModule, IonicModule];
const declarations = [HousingTabsComponent, HousingTabComponent];

@NgModule({
  imports,
  declarations,
  exports: [HousingTabsComponent, HousingTabComponent],
})
export class HousingTabsComponentModule {}
