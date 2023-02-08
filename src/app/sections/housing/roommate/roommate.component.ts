import { Component, Input } from '@angular/core';
import { FacilityOccupantDetails } from '@sections/housing/roommate/roommate.model';

@Component({
  selector: 'st-roommate',
  templateUrl: './roommate.component.html',
  styleUrls: ['./roommate.component.scss'],
})
export class RoommateComponent {
  @Input() patron : FacilityOccupantDetails;
  @Input() roommateNumber: number;
}
