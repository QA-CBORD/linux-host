import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { UnitsService } from '../../units/units.service';

import { Unit } from '../../units/units.model';

@Component({
  selector: 'st-unit-details',
  templateUrl: './unit-details.page.html',
  styleUrls: ['./unit-details.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitDetailsPage implements OnInit, OnDestroy {
  private _subscription: Subscription = new Subscription();

  constructor(private _route: ActivatedRoute, private _unitsService: UnitsService) {}

  units: Unit[];

  ngOnInit() {
    const facilityId = parseInt(this._route.snapshot.paramMap.get('facilityId'), 10);

    const unitsSubscription: Subscription = this._unitsService
      .getUnits(facilityId)
      .subscribe((units: Unit[]) => (this.units = units));

    this._subscription.add(unitsSubscription);
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
