import { Component, OnInit } from '@angular/core';

import { ContractsService } from './contracts.service';

@Component({
  selector: 'st-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.scss'],
})
export class ContractsComponent implements OnInit {
  constructor(private _contractsService: ContractsService) {}

  contracts: any[];

  ngOnInit() {
    this._contractsService.getContracts().subscribe(this._handleSuccess.bind(this))
  }

  trackById(_: number, contract: any): number {
    return contract.id;
  }

  private _handleSuccess(contracts: any[]): void {
    this.contracts = contracts;
  }
}
