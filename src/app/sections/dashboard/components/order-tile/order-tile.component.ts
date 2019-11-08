import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'st-order-tile',
  templateUrl: './order-tile.component.html',
  styleUrls: ['./order-tile.component.scss'],
})
export class OrderTileComponent implements OnInit {

  orderList = [
    {}
  ]

  constructor() { }

  ngOnInit() {}

}
