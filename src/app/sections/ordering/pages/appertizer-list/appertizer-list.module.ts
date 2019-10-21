import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppertizerListComponent } from './appertizer-list.component';

import { AppertizerListRoutingModule } from './appertizer-list.routing.module';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';


const imports = [CommonModule, AppertizerListRoutingModule, StHeaderModule];
const declarations = [AppertizerListComponent];


@NgModule({
  declarations,
  imports,
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppertizerListModule { }
