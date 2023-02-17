import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { ActionsModule } from '../actions/actions.module';

import { ApplicationsComponent } from './applications.component';
import { ApplicationsListComponent } from './applications-list/applications-list.component';
import { HousingAccordionModule } from '../housing-accordion/housing-accordion.module';
import { ApplicationDetailsPopover } from './application-details-popover/application-details-popover.component';
import { StPopoverLayoutModule } from '@shared/ui-components/st-popover-layout/st-popover-layout.module';

const imports = [CommonModule, IonicModule, ActionsModule, RouterModule, HousingAccordionModule, StPopoverLayoutModule];
const declarations = [ApplicationsComponent, ApplicationsListComponent, ApplicationDetailsPopover];

@NgModule({
  imports,
  exports: declarations,
  declarations
})
export class ApplicationsModule {}
