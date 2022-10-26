import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HousingAccordionComponent } from './housing-accordion.component';
import { StopPropagationModule } from '@shared/directives/stop-propogation/stop-propagation.module';
const imports = [CommonModule, IonicModule, StopPropagationModule];
const declarations = [HousingAccordionComponent];

@NgModule({
  imports,
  exports: declarations,
  declarations,
})
export class HousingAccordionModule {}
