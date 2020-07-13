import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { StButtonModule } from '@shared/ui-components/st-button';
import { BiometricPage } from './biometric.page';

const routes: Routes = [
  {
    path: '',
    component: BiometricPage,
  },
];

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, RouterModule.forChild(routes), StButtonModule],
  declarations: [BiometricPage],
})
export class BiometricModule {}
