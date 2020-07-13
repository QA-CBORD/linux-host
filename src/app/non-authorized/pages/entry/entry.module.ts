import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EntryPage } from './entry.page';
import { StButtonModule } from '@shared/ui-components/st-button';

const routes: Routes = [
  {
    path: '',
    component: EntryPage,
  },
];

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, RouterModule.forChild(routes), StButtonModule],
  declarations: [EntryPage],
})
export class EntryPageModule {}
