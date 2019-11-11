import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'st-explore-tile',
  templateUrl: './explore-tile.component.html',
  styleUrls: ['./explore-tile.component.scss'],
})
export class ExploreTileComponent implements OnInit {
  
  exploreList = [
    {
      name: 'Breakfast Express',
      type: 'Cafe · Breakfast · Bagels · Soup',
      img: '/assets/images/order-item-template.jpg',
      merchantInfo: { openNow: true },
    },
    {
      name: 'Cnatina Pizzeria',
      type: 'Pizza · Wings',
      img: '/assets/images/order-item-template.jpg',
      merchantInfo: { openNow: false },
    },
  ];

  constructor() {}

  ngOnInit() {}
}
