import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderDetailsComponent } from '@sections/ordering';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { TypeMessagePipe } from './type-message.pipe';

const declarations = [OrderDetailsComponent, TypeMessagePipe];

@NgModule({
  declarations,
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
  ],
  exports: [OrderDetailsComponent],
})
export class OrderDetailsModule { }
