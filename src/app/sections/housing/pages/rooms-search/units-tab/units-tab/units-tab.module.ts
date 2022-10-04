import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { UnitsTabComponent } from './units-tab.component';

const imports = [
  CommonModule,
  IonicModule,
];

const declarations = [UnitsTabComponent];

@NgModule({
  imports,
  declarations,
  exports:[UnitsTabComponent]
})
export class UnitsTabsModule {}