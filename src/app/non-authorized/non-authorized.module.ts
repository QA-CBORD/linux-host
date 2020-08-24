import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NonAuthorizedRoutingModule } from './non-authorized-routing.module';
import { NgVarModule } from '@shared/directives/ng-var/ng-var.module';

@NgModule({
  imports: [
    CommonModule,
    NonAuthorizedRoutingModule,
    NgVarModule
  ]
})
export class NonAuthorizedModule { }
