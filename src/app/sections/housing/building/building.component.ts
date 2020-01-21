import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { Building } from './building.model';

@Component({
  selector: 'st-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuildingComponent {
  @Input() building: Building;
}
