import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowHideNavbarDirective } from './showhide-navbar.directive';

const declarations = [ShowHideNavbarDirective];

@NgModule({
  declarations,
  imports: [
    CommonModule
  ],
  exports: declarations
})
export class ShowHideNavbarModule { }
