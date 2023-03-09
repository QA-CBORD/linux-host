import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { UnitsTabComponent } from './units-tab.component';
import { HousingTabsComponentModule } from '@sections/housing/pages/housing-dashboard/housing-tabs/housing-tabs.module';

const imports = [
  CommonModule,
  IonicModule,
  HousingTabsComponentModule
];

const declarations = [UnitsTabComponent];

@NgModule({
  imports,
  declarations,
  exports:[UnitsTabComponent]
})
export class UnitsTabsModule {}
