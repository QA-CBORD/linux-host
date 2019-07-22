import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { TransactionHistory } from '../../../../models/transaction-history.model';

@Component({
  selector: 'st-transaction-item',
  templateUrl: './transaction-item.component.html',
  styleUrls: ['./transaction-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionItemComponent implements OnInit {
  @Input() transaction: TransactionHistory;
  constructor() {}

  ngOnInit() {
    console.log(this.transaction);
  }
}
