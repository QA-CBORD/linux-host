import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ContractsService } from './contracts.service';

@Component({
  selector: 'st-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContractsComponent implements OnInit, OnDestroy {
  private _subscription: Subscription = new Subscription();

  constructor(private _contractsService: ContractsService) {}

  contracts: any[];

  ngOnInit(): void {
    const contractsSubscription: Subscription = this._contractsService
      .getContracts()
      .subscribe(this._handleSuccess.bind(this));

    this._subscription.add(contractsSubscription);
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  trackById(_: number, contract: any): number {
    return contract.id;
  }

  private _handleSuccess(contracts: any[]): void {
    this.contracts = contracts;
  }
}
