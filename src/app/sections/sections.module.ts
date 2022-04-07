import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionsRoutingModule } from '@sections/sections-routing.module';
import { ShowHideNavbarModule } from '@shared/directives/showhide-navbar/showhide-navbar.module';
import { SectionsPage } from './sections.page';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StGlobalNavigationModule } from '@shared/ui-components/st-global-navigation/st-global-navigation.module';

@NgModule({
  declarations: [SectionsPage],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    SectionsRoutingModule,
    ShowHideNavbarModule,
    StGlobalNavigationModule
  ],
})
export class SectionsModule {
  constructor() {
  }
}
