import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { StFormsHeaderComponent } from './st-forms-header.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [StFormsHeaderComponent],
  imports: [IonicModule, CommonModule],
  exports: [StFormsHeaderComponent],
})
export class StFormsHeaderModule {}
