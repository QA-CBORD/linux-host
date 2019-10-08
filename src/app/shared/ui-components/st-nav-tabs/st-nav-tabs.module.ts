import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StNavTabsComponent } from './st-nav-tabs.component';
import { IonicModule } from '@ionic/angular';

const declarations = [StNavTabsComponent];

@NgModule({
  declarations,
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: declarations
})
export class StNavTabsModule { }
