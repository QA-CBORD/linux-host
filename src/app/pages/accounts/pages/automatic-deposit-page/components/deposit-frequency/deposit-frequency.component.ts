import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DEPOSIT_FREQUENCY } from '../../auto-deposit.config';
import { AutoDepositService } from '../../service/auto-deposit.service';
import { UserAutoDepositSettingInfo } from '../../models/auto-deposit-settings';

@Component({
  selector: 'st-deposit-frequency',
  templateUrl: './deposit-frequency.component.html',
  styleUrls: ['./deposit-frequency.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepositFrequencyComponent implements OnInit {
  @Output() onFrequencyChanged: EventEmitter<string> = new EventEmitter<string>();
  autoDepositSettings: UserAutoDepositSettingInfo;

  constructor(private readonly autoDepositService: AutoDepositService) {}

  ngOnInit() {
    this.autoDepositSettings = this.autoDepositService.userAutoDepositInfo;
  }

  get frequency() {
    return DEPOSIT_FREQUENCY;
  }

  onFrequencyChange({ detail: { value } }: CustomEvent<any>) {
    this.onFrequencyChanged.emit(value);
  }
}
