import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { TermsModule } from '../../terms/terms.module';
import { HousingDashboardRoutingModule } from './housing-dashboard.routing.module';
import { ApplicationsModule } from '../../applications/applications.module';
import { ContractsModule } from '../../contracts/contracts.module';
import { RoomsModule } from '../../rooms/rooms.module';
import { ContractListModule } from '../../contract-list/contract-list.module'
import { CheckInOutModule } from '../../check-in-out/check-in-out.module'

import { HousingDashboardPage } from './housing-dashboard.component';
import { NonAssginmentsModule } from '@sections/housing/non-assignments/non-assignments.module';
import { WaitingListsModule } from '../../waiting-lists/waiting-lists.module'
import { WorkOrdersModule } from '@sections/housing/work-orders/work-orders.module';
import { InspectionsModule } from '../../inspections-forms/inspections-forms.module';
import { AttachmentModule } from '@sections/housing/attachments/attachments.module';
import { HousingTabsComponentModule } from './housing-tabs/housing-tabs.module';

const imports = [
  CommonModule,
  ReactiveFormsModule,
  IonicModule,
  FormsModule,
  TermsModule,
  ApplicationsModule,
  ContractsModule,
  HousingDashboardRoutingModule,
  RoomsModule,
  NonAssginmentsModule,
  ContractListModule,
  CheckInOutModule,
  WaitingListsModule,
  WorkOrdersModule,
  InspectionsModule,
  AttachmentModule,
  HousingTabsComponentModule
];
const declarations = [HousingDashboardPage];

@NgModule({
  imports,
  declarations,
})
export class HousingDashboardPageModule {}
