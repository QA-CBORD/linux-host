import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FacilitiesService } from '../../facilities/facilities.service';

import { Facility } from '../../facilities/facilities.model';

@Component({
  selector: 'st-facility-details',
  templateUrl: './facility-details.page.html',
  styleUrls: ['./facility-details.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FacilityDetailsPage implements OnInit {
  constructor(private _route: ActivatedRoute, private _facilitiesService: FacilitiesService) {}

  facilities: Facility[];

  ngOnInit() {
    const applicationKey = parseInt(this._route.snapshot.paramMap.get('applicationKey'), 10);

    this._facilitiesService
      .getFacilities(applicationKey)
      .subscribe((facilities: Facility[]) => (this.facilities = facilities));
  }

  toggle(facility: Facility) {
    facility.isExpanded = !facility.isExpanded;
    facility.iconName = facility.isExpanded ? 'arrow-up' : 'arrow-down';
  }

  trackById(_: number, facility: Facility): number {
    return facility.facilityId;
  }
}
