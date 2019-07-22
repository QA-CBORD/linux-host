import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TransactionHistory } from '../../models/transaction-history.model';
import { AccountsService } from '../../services/accounts.service';

@Component({
  selector: 'st-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss'],
})
export class AccountDetailsComponent implements OnInit {
  transactions$: Observable<TransactionHistory[]>;
  constructor(private readonly accountsService: AccountsService) {}

  ngOnInit() {
    this.transactions$ = this.accountsService.transactions$;
  }
}
