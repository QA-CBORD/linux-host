import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { TileListComponent } from './tile-list.component';
import { TileComponent } from './tile/tile.component';

const imports = [CommonModule, SharedModule];
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