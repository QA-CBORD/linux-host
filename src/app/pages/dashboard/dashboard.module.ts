import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SharedModule } from './../../shared/shared.module';
import { DashboardPage } from './dashboard.page';

const imports = [CommonModule, SharedModule];
const declarations = [DashboardPage];
const providers = [];

@NgModule({
  declarations,
  imports,
  providers,
})
@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [DashboardPage],
})
export class DashboardPageModule {}
