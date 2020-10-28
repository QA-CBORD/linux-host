import { Component, Input, OnInit } from '@angular/core';
import { FacilityOccupantDetails } from '@sections/housing/roommate/rooomate.model';

@Component({
  selector: 'st-roommate',
  templateUrl: './roommate.component.html',
  styleUrls: ['./roommate.component.scss'],
})
export class RoommateComponent implements OnInit {
  @Input() patron : FacilityOccupantDetails;
  constructor() { }

  ngOnInit() {
    console.log(this.patron);
  }

}
