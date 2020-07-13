import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { StButtonModule } from '@shared/ui-components/st-button';
import { PinPage } from './pin.page';

const routes: Routes = [
  {
    path: '',
    component: PinPage,
  },
];

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, RouterModule.forChild(routes), StButtonModule],
  declarations: [PinPage],
  exports: [PinPage],
  entryComponents: [PinPage],
})
export class PinModule {}
