import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderDetailsComponent } from '@pages/ordering';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';

const declarations = [OrderDetailsComponent];

@NgModule({
  declarations,
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
  ],
  exports: declarations
})
export class OrderDetailsModule { }
