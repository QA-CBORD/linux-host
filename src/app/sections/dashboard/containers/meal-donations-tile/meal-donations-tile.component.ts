import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MealDonationsService } from '@sections/accounts/pages/meal-donations/service/meal-donations.service';
import { CONTENT_STRING_NAMES } from '@sections/accounts/pages/meal-donations/content-strings';


@Component({
  selector: 'st-meal-donations-tile',
  templateUrl: './meal-donations-tile.component.html',
  styleUrls: ['./meal-donations-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MealDonationsTileComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {

  }
}
