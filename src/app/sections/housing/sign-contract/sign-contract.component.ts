import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ContractsService } from '@sections/housing/contracts/contracts.service';

import { QuestionDateSigned } from '@sections/housing/questions/types';

@Component({
  selector: 'st-sign-contract',
  templateUrl: './sign-contract.component.html',
  styleUrls: ['./sign-contract.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignContractComponent {
  @Input() question: QuestionDateSigned;

  @Input() isSubmitted: boolean;

  constructor(public contractsService: ContractsService) {}

  signContract(event: CustomEvent): void {
    this.contractsService.sign(event.detail.checked);
  }
}
