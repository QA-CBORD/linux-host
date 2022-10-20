import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HousingAccordionComponent } from './housing-accordion.component';
const imports = [CommonModule, IonicModule];
const declarations = [HousingAccordionComponent];

@NgModule({
  imports,
  exports: declarations,
  declarations,
})
export class HousingAccordionModule {}
