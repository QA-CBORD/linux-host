import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StPopoverLayoutComponent } from './st-popover-layout.component';
import { IonicModule } from '@ionic/angular';

const declarations = [StPopoverLayoutComponent];

@NgModule({
  declarations,
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: declarations
})
export class StPopoverLayoutModule { }
