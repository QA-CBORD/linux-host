import { Component, ChangeDetectionStrategy } from '@angular/core';
import { map } from 'rxjs';

import { ContractsStateService } from './contracts-state.service';

@Component({
  selector: 'st-contracts',
  templateUrl: './contracts.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContractsComponent {
  constructor(public contractsStateService: ContractsStateService) {}
  get newItemsAmount() {
    let newContractsLength;
    this.contractsStateService.contracts$
      .pipe(map(items => items.filter(x => x.state === 'Active' || x.state === 'Preliminary')))
      .subscribe({
        next: newItems => {
          newContractsLength = newItems.length;
        },
      });

    return newContractsLength;
  }
}
