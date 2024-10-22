import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StActivateLocationItemComponent } from './st-activate-location-item.component';
import { StHeaderModule } from '../st-header/st-header.module';
import { IonicModule } from '@ionic/angular';

const declarations = [StActivateLocationItemComponent];

@NgModule({
  declarations,
  imports: [
    CommonModule,
    StHeaderModule,
    IonicModule,
  ],
  exports: declarations
})
export class StActivateLocationItemModule { }
