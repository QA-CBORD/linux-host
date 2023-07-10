import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ROLES } from 'src/app/app.global';

import { ContractFormStatus, ContractListDetails, ContractStatus } from '../contracts.model';
import { isDefined } from '@sections/housing/utils';

@Component({
  selector: 'st-contracts-list',
  templateUrl: './contracts-list.component.html',
  styleUrls: ['../../applications/applications-list/applications-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContractsListComponent {
  @Input() contracts: ContractListDetails[];

  getPath = (key: number, contractElementKey: number): string =>
    `${ROLES.patron}/housing/contracts/${key}/${contractElementKey}`;

  trackById = (_: number, contract: ContractListDetails): number => contract.id;

  allowEdit(contract: ContractListDetails): boolean {
    const allowedStates = [ContractStatus.Active, ContractStatus.Preliminary];
    return !isDefined(contract.acceptedDate) && allowedStates.includes(+contract.state);
  }

  getStatus(contract: ContractListDetails): string {
    const statusValue = this.getFormStatus(+contract.state);
    // checks if accepted date exists for an active contract
    const isCompleted =
      ContractStatus[contract.state] == ContractStatus.Active ||
      ContractStatus[contract.state] == ContractStatus.Preliminary;
    const formStatus =
      isDefined(contract.acceptedDate) && isCompleted
        ? ContractFormStatus[ContractStatus.Completed]
        : ContractFormStatus[statusValue];
    return formStatus;
  }

  getFormStatus(state: number): string {
    let formStatus;
    switch (state) {
      case ContractStatus.Active:
      case ContractStatus.Preliminary:
        formStatus = ContractStatus.Active | ContractStatus.Preliminary;
        break;
      case ContractStatus.Completed:
        formStatus = ContractStatus.Completed;
        break;
      case ContractStatus.Suspended:
        formStatus = ContractStatus.Suspended;
        break;
      case ContractStatus.Canceled:
      case ContractStatus.Terminated:
        formStatus = ContractStatus.Terminated | ContractStatus.Canceled;
        break;
      case ContractStatus.Expired:
        formStatus = ContractStatus.Expired;
        break;
      default:
        formStatus = ContractStatus.Active | ContractStatus.Preliminary;
    }

    return formStatus;
  }
}
