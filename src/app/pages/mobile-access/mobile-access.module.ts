import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MobileAccessPage } from './mobile-access.page';
import { LocationDetailPageModule } from './location-detail/location-detail.module';

const routes: Routes = [
  {
    path: '',
    component: MobileAccessPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    LocationDetailPageModule
  ],
  declarations: [MobileAccessPage]
})
export class MobileAccessPageModule {}
