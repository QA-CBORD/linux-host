import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'st-accounts-tile',
  templateUrl: './accounts-tile.component.html',
  styleUrls: ['./accounts-tile.component.scss'],
})
export class AccountsTileComponent implements OnInit {

  accounts = [
    {title: "Dinning Dolars", total: 12343},
    {title: "Bonus Bucks", total: 243},
    {title: "Meal Swipes", total: 43},
    {title: "Guest  Meals", total: 43},
    {title: "Dinning Dolars", total: 343},
    {title: "Dinning Dolars", total: 12343},
    {title: "Bonus Bucks", total: 243},
    {title: "Meal Swipes", total: 43},
    {title: "Guest  Meals", total: 43},
  ]

  slideOpts = {
    initialSlide: 1,
    spaceBetween: 0,
    speed: 400,
    width: 330,
    autoHeight: true
  };
  constructor() { }

  ngOnInit() {}

}
