import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HousingTabsComponent } from './housing-tabs.component';
const imports = [
  CommonModule,
  IonicModule,
];
const declarations = [HousingTabsComponent];

@NgModule({
  imports,
  declarations,
  exports:[HousingTabsComponent]
})
export class HousingTabsComponentModule {}
