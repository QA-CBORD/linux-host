import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'st-facility-details',
  templateUrl: './facility-details.page.html',
  styleUrls: ['./facility-details.page.scss'],
})
export class FacilityDetailsPage implements OnInit {

  params: Params;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.params = this.route.snapshot.params;
  }

}
