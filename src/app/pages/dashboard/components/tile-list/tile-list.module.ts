
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TileListComponent } from './tile-list.component';
import { TileComponent } from './tile/tile.component';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';

const imports = [IonicModule, CommonModule, SharedModule];
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