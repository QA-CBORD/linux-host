import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { FormDetailsHeaderComponent } from './form-details-header.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [FormDetailsHeaderComponent],
  imports: [IonicModule, CommonModule],
  exports: [FormDetailsHeaderComponent],
})
export class FormDetailsHeaderModule {}
