import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TransactionHistory } from '@core/model/transactions/transaction-history.model';

@Component({
  selector: 'st-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsComponent {
  @Input() transactions: TransactionHistory[];
  @Input() dividers: boolean;
}
