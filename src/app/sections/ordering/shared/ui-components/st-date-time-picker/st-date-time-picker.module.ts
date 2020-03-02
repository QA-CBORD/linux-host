import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { StDateTimePickerComponent } from './st-date-time-picker.component';

const declarations = [StDateTimePickerComponent];

@NgModule({
	declarations,
	exports: [StDateTimePickerComponent],
	imports: [CommonModule, IonicModule],
})
export class StDateTimePickerModule { }
