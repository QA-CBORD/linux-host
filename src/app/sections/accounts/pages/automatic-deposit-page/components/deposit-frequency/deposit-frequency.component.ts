import { ChangeDetectionStrategy, Component, EventEmitter, Output, Input } from '@angular/core';
import { RadioGroupCustomEvent } from '@ionic/angular';
import { DEPOSIT_FREQUENCY } from '../../auto-deposit.config';
import { UserAutoDepositSettingInfo } from '../../models/auto-deposit-settings';
import { TranslateModule } from '@ngx-translate/core';
import { IonItem, IonLabel, IonList, IonRadio, IonRadioGroup } from '@ionic/angular/standalone';

@Component({
  selector: 'st-deposit-frequency',
  standalone: true,
  imports: [IonList, IonRadio, IonRadioGroup, IonItem, IonLabel, TranslateModule],
  templateUrl: './deposit-frequency.component.html',
  styleUrls: ['./deposit-frequency.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepositFrequencyComponent {
  @Output() onFrequencyChanged: EventEmitter<string> = new EventEmitter<string>();
  @Input() set autoDepositSettings(autoDepositSettings: UserAutoDepositSettingInfo) {
    this.selectedFrequency = '';
    if (autoDepositSettings?.dayOfWeek !== 0) {
      this.selectedFrequency = DEPOSIT_FREQUENCY.week;
    }
    if (autoDepositSettings?.dayOfMonth !== 0) {
      this.selectedFrequency = DEPOSIT_FREQUENCY.month;
    }
  }

  selectedFrequency: string;

  get frequency() {
    return DEPOSIT_FREQUENCY;
  }

  onFrequencyChange({ detail: { value } }: RadioGroupCustomEvent) {
    this.onFrequencyChanged.emit(value);
  }
}
