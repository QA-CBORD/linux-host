import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DepositFrequencyComponent } from './deposit-frequency.component';
import { UserAutoDepositSettingInfo } from '../../models/auto-deposit-settings';
import { DEPOSIT_FREQUENCY } from '../../auto-deposit.config';
import { RadioGroupCustomEvent } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

describe('DepositFrequencyComponent', () => {
  let component: DepositFrequencyComponent;
  let fixture: ComponentFixture<DepositFrequencyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [DepositFrequencyComponent],
      providers: [{ provide: TranslateService, useValue: {} }],
    });
    fixture = TestBed.createComponent(DepositFrequencyComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize selectedFrequency properly when autoDepositSettings.dayOfWeek is set', () => {
    const autoDepositSettings = { dayOfWeek: 1, dayOfMonth: 0 } as UserAutoDepositSettingInfo;
    component.autoDepositSettings = autoDepositSettings;
    expect(component.selectedFrequency).toEqual(DEPOSIT_FREQUENCY.week);
  });

  it('should initialize selectedFrequency properly when autoDepositSettings.dayOfMonth is set', () => {
    const autoDepositSettings = { dayOfWeek: 0, dayOfMonth: 1 } as UserAutoDepositSettingInfo;
    component.autoDepositSettings = autoDepositSettings;
    expect(component.selectedFrequency).toEqual(DEPOSIT_FREQUENCY.month);
  });

  it('should initialize selectedFrequency as empty string when autoDepositSettings is not set', () => {
    component.autoDepositSettings = null;
    expect(component.selectedFrequency).toEqual(DEPOSIT_FREQUENCY.month);
  });

  it('should emit onFrequencyChanged event when onFrequencyChange is called', () => {
    const mockValue = 'someValue';
    const emitSpy = jest.spyOn(component.onFrequencyChanged, 'emit');
    const event = { detail: { value: mockValue } } as RadioGroupCustomEvent;
    component.onFrequencyChange(event);
    expect(emitSpy).toHaveBeenCalledWith(mockValue);
  });

  it('should get the frequency', () => {
    expect(component.frequency).toEqual(DEPOSIT_FREQUENCY);
  });
});
