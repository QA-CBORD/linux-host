import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { ExternalLoginPage } from './external-login.page';
import { StGlobalPopoverModule } from '@shared/ui-components/st-global-popover/st-global-popover.module';

const routes: Routes = [
  {
    path: '',
    component: ExternalLoginPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StGlobalPopoverModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ExternalLoginPage]
})
export class ExternalLoginPageModule {}
