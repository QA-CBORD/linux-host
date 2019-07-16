import { Component, Input, OnInit } from '@angular/core';
import { TransactionHistory } from '../../models/transaction-history.model';

@Component({
  selector: 'st-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit {
  @Input() transactions: TransactionHistory[];

  constructor() {}

  ngOnInit() {}
}
