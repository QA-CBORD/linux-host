import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { FullMenuComponent } from './full-menu.component';
import { FullMenuRoutingModule } from './full-menu.routing.module';

const imports = [CommonModule, IonicModule, FullMenuRoutingModule];
const declarations = [FullMenuComponent];
const providers = [];

@NgModule({
  declarations,
  imports,
  providers
})
export class FullMenuModule { }
