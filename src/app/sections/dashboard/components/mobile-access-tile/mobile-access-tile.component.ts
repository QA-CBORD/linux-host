import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'st-mobile-access-tile',
  templateUrl: './mobile-access-tile.component.html',
  styleUrls: ['./mobile-access-tile.component.scss'],
})
export class MobileAccessTileComponent implements OnInit {
  accessList = [
    {id: 6789, location: 'My Door'},
    {id: 4321, location: 'Vending Machine'},
    {id: 1234, location: 'Laundry'},
    {id: 3243, location: 'Seal Hall'},
  ];

  constructor() {}

  ngOnInit() {}
}
