import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NonAuthorizedRoutingModule } from './non-authorized-routing.module';
import { ConnectivityModule } from '@shared/connectivity.module';

@NgModule({
  imports: [
    CommonModule,
    NonAuthorizedRoutingModule,
    ConnectivityModule
  ]
})
export class NonAuthorizedModule { }
