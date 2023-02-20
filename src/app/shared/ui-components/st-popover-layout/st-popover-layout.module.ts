import { StButtonModule } from './../st-button/st-button.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StPopoverLayoutComponent } from './st-popover-layout.component';
import { IonicModule } from '@ionic/angular';

const declarations = [StPopoverLayoutComponent];

@NgModule({
  declarations,
  imports: [
    CommonModule,
    IonicModule,
    StButtonModule
  ],
  exports: declarations
})
export class StPopoverLayoutModule { }
