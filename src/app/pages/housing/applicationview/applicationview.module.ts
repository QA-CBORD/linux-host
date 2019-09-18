import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ApplicationviewPage } from './applicationview.page';
import { FacilityviewPage } from '../facilityview/facilityview.page';

const routes: Routes = [
  { path: '', component: ApplicationviewPage },
  { path: 'facilityview/:applicationId', loadChildren: '../facilityview/facilityview.module#FacilityviewPageModule' },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ApplicationviewPage]
})
export class ApplicationviewPageModule {}
