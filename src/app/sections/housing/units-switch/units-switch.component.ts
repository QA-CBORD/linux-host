import { Component, ChangeDetectionStrategy, Input, OnInit } from '@angular/core';

import { Unit } from './units-switch.model';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'st-units-switch',
  templateUrl: './units-switch.component.html',
  styleUrls: ['./units-switch.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class UnitsSwitchComponent implements OnInit {
  @Input() units: Unit[];
  isFacilityActive = true;
  constructor(private _router: Router) {
  }

  ngOnInit() {
    this._router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      if (this._isPathForUnits(event.urlAfterRedirects)) {
        this.isFacilityActive = false;
      } else {
        this.isFacilityActive = true;
      }
    })
  }
  private _isPathForUnits(url: string): boolean {
    if (url.includes('units')){
      return true;
    } else {
      return false;
    }
  }
  isUnits(unit: Unit):boolean {
    return unit.title === 'Units';
  }
}
