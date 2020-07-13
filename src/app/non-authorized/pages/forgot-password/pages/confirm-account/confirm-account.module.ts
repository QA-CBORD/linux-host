import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ConfirmAccountPage } from './confirm-account.page';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';

const routes: Routes = [
  {
    path: '',
    component: ConfirmAccountPage
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
  declarations: [ConfirmAccountPage]
})
export class ConfirmAccountPageModule {}
