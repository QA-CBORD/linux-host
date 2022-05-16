import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NonAuthorizedRoutingModule } from './non-authorized-routing.module';
import { ConnectivityModule } from '@shared/connectivity.module';
import { ScanCardModule } from '@sections/dashboard/containers/scan-card/scan-card.module';

@NgModule({
  imports: [
    CommonModule,
    NonAuthorizedRoutingModule,
    ConnectivityModule,
    ScanCardModule
  ]
})
export class NonAuthorizedModule { }
