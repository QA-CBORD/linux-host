import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'st-transactions-tile',
  templateUrl: './transactions-tile.component.html',
  styleUrls: ['./transactions-tile.component.scss'],
})
export class TransactionsTileComponent implements OnInit {

  transactions = [
    {locationName: 'Pizza Pandemonium', actualDate: '2/16/19, 5:01pm', transactionType: '-2', amount: 2, accountName: "Dinning Dolars"},
    {locationName: 'Pizza Pandemonium', actualDate: '2/16/19, 5:01pm', transactionType: '-2', amount: 2, accountName: "Dinning Dolars"},
    {locationName: 'Pizza Pandemonium', actualDate: '2/16/19, 5:01pm', transactionType: '-2', amount: 2, accountName: "Dinning Dolars"},
  ];

  constructor() { }

  ngOnInit() {}

}
