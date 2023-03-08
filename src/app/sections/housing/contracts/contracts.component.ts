import { Component, ChangeDetectionStrategy } from '@angular/core';

import { ContractsStateService } from './contracts-state.service';

@Component({
  selector: 'st-contracts',
  templateUrl: './contracts.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContractsComponent {
  constructor(public contractsStateService: ContractsStateService) {}

}
