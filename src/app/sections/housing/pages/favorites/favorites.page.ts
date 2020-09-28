import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Unit } from '../../units-switch/units-switch.model';

@Component({
  selector: 'st-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritesPage {
  units: Unit[] = [
    new Unit('/housing/favorites/buildings', 'Buildings'),
    new Unit('/housing/favorites/units', 'Units'),
  ];
}
