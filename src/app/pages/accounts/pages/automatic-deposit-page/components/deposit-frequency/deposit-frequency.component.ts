import { ChangeDetectionStrategy, Component, EventEmitter, Output, Input } from '@angular/core';
import { DEPOSIT_FREQUENCY } from '../../auto-deposit.config';
import { UserAutoDepositSettingInfo } from '../../models/auto-deposit-settings';

@Component({
  selector: 'st-deposit-frequency',
  templateUrl: './deposit-frequency.component.html',
  styleUrls: ['./deposit-frequency.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepositFrequencyComponent {
  @Output() onFrequencyChanged: EventEmitter<string> = new EventEmitter<string>();
  @Input() autoDepositSettings: UserAutoDepositSettingInfo;


  get frequency() {
    return DEPOSIT_FREQUENCY;
  }

  onFrequencyChange({ detail: { value } }: CustomEvent<any>) {
    this.onFrequencyChanged.emit(value);
  }
}
