import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { ContractListDetails } from '../contracts.model';

@Component({
  selector: 'st-contracts-list',
  templateUrl: './contracts-list.component.html',
  styleUrls: ['../../applications/applications-list/applications-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContractsListComponent {
  @Input() contracts: ContractListDetails[];

  getPath(key: number, contractElementKey: number): string {
    return `/housing/contracts/${key}/${contractElementKey}`;
  }

  trackById(_: number, contract: ContractListDetails): number {
    return contract.id;
  }
}
