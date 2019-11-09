import { Component, OnInit } from '@angular/core';

import { AccountsService } from '../../services/accounts.service';

@Component({
  selector: 'st-accounts-tile',
  templateUrl: './accounts-tile.component.html',
  styleUrls: ['./accounts-tile.component.scss'],
})
export class AccountsTileComponent implements OnInit {


  accounts = [
    [
    {title: "Dinning Dolars", total: 12343},
    {title: "Bonus Bucks", total: 243},
    {title: "Meal Swipes", total: 43},
    {title: "Meal Swipes", total: 43}
    ],
    [
    {title: "M2eal Swipes", total: 43},
    {title: "Meal Swipes", total: 43},
    {title: "Meal Swipes", total: 43},
    {title: "Meal Swipes", total: 43}
    ],
  [
    {title: "Meal Swipes", total: 43},
    {title: "Meal Swipes", total: 43},
    {title: "Meal Swipes", total: 43},
    {title: "Meal Swipes", total: 43}
  ],
  [
    {title: "Meal Swipes", total: 43},
    {title: "Meal Swipes", total: 43}
  ]
  ];

  accounts2 = [
    {title: "Dinning Dolars", total: 12343},
    {title: "Bonus Bucks", total: 243},
    {title: "Meal Swipes", total: 43},
    {title: "Meal Swipes", total: 43},
    {title: "M2eal Swipes", total: 43},
    {title: "Meal Swipes", total: 43},
    {title: "Meal Swipes", total: 43},
    {title: "Meal Swipes", total: 43},
    {title: "Meal Swipes", total: 43},
    {title: "Meal Swipes", total: 43},
    {title: "Meal Swipes", total: 43},
    {title: "Meal Swipes", total: 43},
    {title: "Guest  Meals", total: 43},
  ];

  slidesArray: any[];

  slideOpts = {
    initialSlide: 0,
    spaceBetween: 0,
    speed: 400,
    width: 330,
    autoHeight: true
  };
  
  constructor() { }

  ngOnInit() {
    this.accounts.forEach((account, index) => {

    })
  }

}
