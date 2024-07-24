import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Observable, zip } from 'rxjs';
import { map } from 'rxjs/operators';
import { AUTO_DEPOSIT_PAYMENT_TYPES } from '../../auto-deposit.config';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { Settings } from '../../../../../../app.global';
import { IonItem, IonLabel, IonRadio, IonRadioGroup } from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'st-deposit-type-nav',
  standalone: true,
  imports: [IonRadioGroup, IonItem, IonLabel, IonRadio, NgIf, AsyncPipe, TranslateModule],
  templateUrl: './deposit-type-nav.component.html',
  styleUrls: ['./deposit-type-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepositTypeNavComponent implements OnInit {
  @Output() onTypeChanged: EventEmitter<number> = new EventEmitter<number>();
  @Input() activeType: number;
  private availableTypes: Observable<{ [key: number]: boolean }>;

  constructor(private readonly settingsFacadeService: SettingsFacadeService) {}

  get autoDepositTypes() {
    return AUTO_DEPOSIT_PAYMENT_TYPES;
  }

  get isLowBalanceAvailable(): Observable<boolean> {
    return this.availableTypes.pipe(map(types => types[AUTO_DEPOSIT_PAYMENT_TYPES.lowBalance]));
  }

  get isTimeBasedAvailable(): Observable<boolean> {
    return this.availableTypes.pipe(map(types => types[AUTO_DEPOSIT_PAYMENT_TYPES.timeBased]));
  }

  ngOnInit() {
    this.setAvailableTypes();
  }

  onTypeChange({ detail: { value } }: CustomEvent) {
    this.activeType = value;
    this.onTypeChanged.emit(value);
  }

  private setAvailableTypes() {
    this.availableTypes = zip(
      this.settingsFacadeService.getSetting(Settings.Setting.AUTO_DEPOSIT_ENABLED),
      this.settingsFacadeService.getSetting(Settings.Setting.LOW_BALANCE_AUTO_DEPOSIT_ENABLED)
    ).pipe(
      map(settings => {
        const timeBased = settings[0];
        const low = settings[1];
        return {
          [AUTO_DEPOSIT_PAYMENT_TYPES.lowBalance]: low && Boolean(Number(low.value)),
          [AUTO_DEPOSIT_PAYMENT_TYPES.timeBased]: timeBased && Boolean(Number(timeBased.value)),
        };
      })
    );
  }
}
