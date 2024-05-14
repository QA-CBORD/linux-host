import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { StHeaderComponent } from './st-header.component';
import { TranslateModule } from '@ngx-translate/core';

const declarations = [StHeaderComponent];

@NgModule({
  declarations,
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule,
  ],
  exports: declarations
})
export class StHeaderModule { }
