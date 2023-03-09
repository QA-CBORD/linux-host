import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetTypeDetailsComponent } from './asset-type-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

const imports = [CommonModule, ReactiveFormsModule, IonicModule];
const declarations = [AssetTypeDetailsComponent];

@NgModule({
  imports,
  exports: declarations,
  declarations,
})
export class AssetTypeDetailsModule { }
