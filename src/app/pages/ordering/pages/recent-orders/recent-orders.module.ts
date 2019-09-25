import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { RecentOrdersComponent } from './recent-orders.component';

const imports = [CommonModule, SharedModule, IonicModule];
const declarations = [RecentOrdersComponent];
const providers = [];
const entryComponents = [];

@NgModule({
  declarations,
  imports,
  providers,
  entryComponents,
})
export class RecentOrdersModule {}
