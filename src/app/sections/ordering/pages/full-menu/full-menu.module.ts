import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { FullMenuComponent } from './full-menu.component';
import { FullMenuRoutingModule } from './full-menu.routing.module';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';

const imports = [CommonModule, IonicModule, FullMenuRoutingModule, StHeaderModule];
const declarations = [FullMenuComponent];
const providers = [];

@NgModule({
  declarations,
  imports,
  providers
})
export class FullMenuModule { }
