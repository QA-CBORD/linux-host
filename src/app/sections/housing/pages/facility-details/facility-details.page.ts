import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { FacilitiesService } from '../../facilities/facilities.service';

import { Facility } from '../../facilities/facilities.model';

@Component({
  selector: 'st-facility-details',
  templateUrl: './facility-details.page.html',
  styleUrls: ['./facility-details.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FacilityDetailsPage implements OnInit, OnDestroy {
  private _subscription: Subscription = new Subscription();

  facilities: Facility[];

  constructor(private _route: ActivatedRoute, private _facilitiesService: FacilitiesService, private router: Router) {}

  ngOnInit() {
    const applicationKey = parseInt(this._route.snapshot.paramMap.get('applicationKey'), 10);

    const facilitiesSubscription: Subscription = this._facilitiesService
      .getFacilities(applicationKey)
      .subscribe((facilities: Facility[]) => (this.facilities = facilities));

    this._subscription.add(facilitiesSubscription);
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  toggle(facility: Facility) {
    facility.isExpanded = !facility.isExpanded;
    facility.iconName = facility.isExpanded ? 'arrow-up' : 'arrow-down';
  }

  trackById(_: number, facility: Facility): number {
    return facility.facilityId;
  }

  viewUnits(facility: Facility) {
    this.router.navigate(['units', facility.facilityId]);
  }
}
