import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchByPage } from './search-by.page';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { StInputFloatingLabelModule } from '@shared/ui-components/st-input-floating-label/st-input-floating-label.module';

export const imports = [
  CommonModule,
  IonicModule,
  ReactiveFormsModule,
  StInputFloatingLabelModule,
];
export const declarations = [SearchByPage];

@NgModule({
  imports,
  exports: declarations,
  declarations,
})
export class SearchByPageModule { }