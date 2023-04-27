import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InstitutionsPage } from './institutions.page';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';
import { SearchPipeModule } from '@shared/pipes/search-pipe/search.pipe.module';
import { StButtonModule } from '@shared/ui-components/st-button';
import { StHeaderSearchBarModule } from '@shared/ui-components/st-header-search-bar/st-header-search-bar.module';

const routes: Routes = [
  {
    path: '',
    component: InstitutionsPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StHeaderModule,
    StButtonModule,
    RouterModule.forChild(routes),
    SearchPipeModule,
    StHeaderSearchBarModule
  ],
  declarations: [InstitutionsPage],
})
export class InstitutionsPageModule {}
