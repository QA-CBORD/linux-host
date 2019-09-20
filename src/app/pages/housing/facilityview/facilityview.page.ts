import { Component, OnInit, NgModule } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FacilitylistService } from '../services/facilitylist.service';
import { FacilitiesList } from '../Models/facilities-list';
import { ExpandableComponent } from '../pages/facility-details/expandable/expandable.component';

@NgModule({
  declarations: [ExpandableComponent]
})

@Component({
  selector: 'app-facilityview',
  templateUrl: './facilityview.page.html',
  styleUrls: ['./facilityview.page.scss'],
})
export class FacilityviewPage implements OnInit {

  applicationId: number;
  facilitiesList: FacilitiesList[];
  constructor(
    private activatedRoute: ActivatedRoute,
    private facilityListService: FacilitylistService
  ) { }

  ngOnInit() {
    this.applicationId = parseInt(this.activatedRoute.snapshot.paramMap.get('applicationId'), 10);
    this.facilitiesList = this.facilityListService.GetFacilityListForApplication(this.applicationId);
  }

  OpenDetails(fac: FacilitiesList) {
    fac.isExpanded = !fac.isExpanded;
    fac.iconName = fac.isExpanded ? 'arrow-up' : 'arrow-down';
  }

}
