import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'st-meal-donations-tile',
  templateUrl: './meal-donations-tile.component.html',
  styleUrls: ['./meal-donations-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MealDonationsTileComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

}
