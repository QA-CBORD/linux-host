import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AutoDepositService } from '../../service/auto-deposit.service';
import { SettingService } from '../../../../services/setting.service';
import { SYSTEM_SETTINGS_CONFIG } from '../../../../accounts.config';
import { parseArray } from '../../../../../../core/utils/general-helpers';
import { AUTO_DEPOSIT_PAYMENT_TYPES } from '../../auto-deposit.config';

@Component({
  selector: 'st-deposit-type-nav',
  templateUrl: './deposit-type-nav.component.html',
  styleUrls: ['./deposit-type-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepositTypeNavComponent implements OnInit {
  @Output() onTypeChanged: EventEmitter<number> = new EventEmitter<number>();
  private availableTypes: Observable<number[]>;
  activeType: number = 0;

  constructor(private readonly autoDepositService: AutoDepositService,
              private readonly settingService: SettingService) {
  }

  get autoDepositTypes() {
    return AUTO_DEPOSIT_PAYMENT_TYPES;
  }

  get isLowBalanceAvailable(): Observable<boolean> {
    return this.availableTypes.pipe(map((types) => types.includes(AUTO_DEPOSIT_PAYMENT_TYPES.lowBalance)));
  }

  get isTimeBasedAvailable(): Observable<boolean> {
    return this.availableTypes.pipe(map((types) => types.includes(AUTO_DEPOSIT_PAYMENT_TYPES.timeBased)));
  }

  ngOnInit() {
    this.availableTypes = this.settingService.settings$.pipe(
      map(settings => {
        const typesSetting = this.settingService.getSettingByName(settings, SYSTEM_SETTINGS_CONFIG.autoDepositPaymentTypes.name);

        return typesSetting ? parseArray<number>(typesSetting.value) : [];
      }),
    );
  }

  onTypeChange({detail: {value}}: CustomEvent) {
    this.activeType = value;
    this.onTypeChanged.emit(value);
  }
}
