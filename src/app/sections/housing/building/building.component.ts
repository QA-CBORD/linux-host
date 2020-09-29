import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { Building } from './building.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'st-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuildingComponent {
  @Input() building: Building;
  constructor(private _router: Router,
              private _activeRoute: ActivatedRoute
  ) {}

  goToUnits(buildingKey: number) {
    this._router.navigate(['../units', buildingKey ], { relativeTo: this._activeRoute });
  }
}
