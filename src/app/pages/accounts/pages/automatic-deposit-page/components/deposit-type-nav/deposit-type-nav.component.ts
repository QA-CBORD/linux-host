import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
  Input,
} from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { SettingService } from '../../../../services/setting.service';
import { SYSTEM_SETTINGS_CONFIG } from '../../../../accounts.config';
import { AUTO_DEPOSIT_PAYMENT_TYPES } from '../../auto-deposit.config';

@Component({
  selector: 'st-deposit-type-nav',
  templateUrl: './deposit-type-nav.component.html',
  styleUrls: ['./deposit-type-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepositTypeNavComponent implements OnInit{
  @Output() onTypeChanged: EventEmitter<number> = new EventEmitter<number>();
  @Input() activeType: number;
  private availableTypes: Observable<{ [key: number]: boolean }>;

  constructor(private readonly settingService: SettingService) {}

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
    this.availableTypes = this.settingService.settings$.pipe(
      map(settings => {
        const timeBased = this.settingService.getSettingByName(
          settings,
          SYSTEM_SETTINGS_CONFIG.enableAutoDeposits.name
        );
        const low = this.settingService.getSettingByName(
          settings,
          SYSTEM_SETTINGS_CONFIG.lowBalanceAutoDepositEnabled.name
        );

        return {
          [AUTO_DEPOSIT_PAYMENT_TYPES.lowBalance]: low && Boolean(Number(low.value)),
          [AUTO_DEPOSIT_PAYMENT_TYPES.timeBased]: timeBased && Boolean(Number(timeBased.value)),
        };
      })
    );
  }
}
