import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

import { SignContractEvent } from './sign-contract.model';

@Component({
  selector: 'st-sign-contract',
  templateUrl: './sign-contract.component.html',
  styleUrls: ['./sign-contract.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignContractComponent {
  @Output() signed: EventEmitter<SignContractEvent> = new EventEmitter<SignContractEvent>();

  isSigned: boolean = false;

  dateTime: string;

  signContract(): void {
    this.isSigned = !this.isSigned;
    this.dateTime = new Date().toISOString();

    this.signed.emit(new SignContractEvent(this.isSigned, this.dateTime));
  }
}
