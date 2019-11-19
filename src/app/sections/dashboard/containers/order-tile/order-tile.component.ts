import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'st-order-tile',
  templateUrl: './order-tile.component.html',
  styleUrls: ['./order-tile.component.scss'],
})
export class OrderTileComponent implements OnInit {

  orderList: any[] = [
    [
    { title: 'Vegan food', img: '/assets/images/order-item-template.jpg' }, 
    { title: 'Vegan food', img: '/assets/images/order-item-template.jpg' }, 
    ],
    [
    { title: 'Vegan food', img: '/assets/images/order-item-template.jpg' }, 
    { title: 'Vegan food', img: '/assets/images/order-item-template.jpg' }, 
    ]
  ];
  
  slideOpts = {
    initialSlide: 0,
    spaceBetween: 0,
    speed: 400,
    width: 330,
    autoHeight: true
  };
  
  constructor() {}

  ngOnInit() {}
}
