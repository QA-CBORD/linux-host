
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TileListComponent } from './tile-list.component';
import { TileComponent } from './tile/tile.component';
import { IonicModule } from '@ionic/angular';

const imports = [IonicModule, CommonModule];
const declarations = [TileListComponent, TileComponent];
const providers = [
];

@NgModule({
    declarations,
    imports,
    providers,
})
export class TileListModule {
}