import { Component, Input, OnInit } from '@angular/core';
import { FacilityOccupantDetails } from '@sections/housing/roommate/roomate.model';

@Component({
  selector: 'st-roommate',
  templateUrl: './roommate.component.html',
  styleUrls: ['./roommate.component.scss'],
})
export class RoommateComponent implements OnInit {
  @Input() patron : FacilityOccupantDetails;
  @Input() roommateNumber: number;
  constructor() { }

  ngOnInit() {
  }

}