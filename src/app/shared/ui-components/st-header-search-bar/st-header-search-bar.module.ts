import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { StHeaderSearchBarComponent } from './st-header-search-bar.component';

const declarations = [StHeaderSearchBarComponent];

@NgModule({
  declarations,
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: declarations
})
export class StHeaderSearchBarModule { }
