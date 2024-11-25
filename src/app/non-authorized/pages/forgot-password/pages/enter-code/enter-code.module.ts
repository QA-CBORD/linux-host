import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EnterCodePage } from './enter-code.page';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';

const routes: Routes = [
  {
    path: '',
    component: EnterCodePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    StHeaderModule,
  ],
  declarations: [EnterCodePage]
})
export class EnterCodePageModule {}
