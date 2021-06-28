import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { PageTitleModule } from '@sections/housing/page-title/page-title.module';
import { BackButtonModule } from '@shared/ui-components/back-button/back-button.module';
import { RoommateSearchPage } from './roommate-search.page';
import { RoommateSearchRoutingModule } from './roommate-search.routing.module';

const imports = [
  CommonModule,
  IonicModule,
  PageTitleModule,
  BackButtonModule,
  RoommateSearchRoutingModule
];
const declarations = [RoommateSearchPage];

@NgModule({
  imports,
  declarations,
})
export class RoommateSearchPageModule { }
