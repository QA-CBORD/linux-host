import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TransactionHistory } from '@core/model/transactions/transaction-history.model';

@Component({
  selector: 'st-transaction-item',
  templateUrl: './transaction-item.component.html',
  styleUrls: ['./transaction-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionItemComponent {
  @Input() transaction: TransactionHistory;
}
