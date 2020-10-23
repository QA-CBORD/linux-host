import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { OnInit } from '@angular/core';

import { Unit } from './unit.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'st-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitComponent implements  OnInit{
  @Input() unit: Unit;

  constructor(private _router: Router) {
  }

  ngOnInit() {
  }
  goToUnitDetails() {
    this._router.navigateByUrl(`patron/housing/units/${this.unit.key}/building/${this.unit.parentKey}`);

  }
}
