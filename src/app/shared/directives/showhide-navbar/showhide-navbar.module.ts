import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowHideNavbarDirective } from './showhide-navbar.directive';
import { NativeProvider } from '@core/provider/native-provider/native.provider';

const declarations = [ShowHideNavbarDirective];

@NgModule({
  declarations,
  imports: [
    CommonModule
  ],
  providers:[NativeProvider],
  exports: declarations
})
export class ShowHideNavbarModule { }
