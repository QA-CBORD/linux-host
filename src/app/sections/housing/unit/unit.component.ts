import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { OnInit } from '@angular/core';

import { Unit } from './unit.model';
import { Router } from '@angular/router';

@Component({
  selector: 'st-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitComponent {
  @Input() unit: Unit;

  constructor(private _router: Router) {}

  goToUnitDetails() {
    this._router.navigateByUrl(`patron/housing/units/${this.unit.key}/building/${this.unit.parentKey}`);
  }
}
