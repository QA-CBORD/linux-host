import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FacilityviewPage } from './facilityview.page';
import { ExpandableComponent } from '../pages/facility-details/expandable/expandable.component';

const routes: Routes = [
    { path: '', component: FacilityviewPage },
    { path: 'unitsview/:facilityId', loadChildren: '../units-view/units-view.module#UnitsViewPageModule' }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FacilityviewPage,
    ExpandableComponent]
})
export class FacilityviewPageModule {}
