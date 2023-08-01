import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, EventEmitter, Input, NO_ERRORS_SCHEMA, Output } from '@angular/core';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { DepositTypeNavComponent } from './deposit-type-nav.component';
import { Observable, of } from 'rxjs';
import { SettingInfo } from '@core/model/configuration/setting-info.model';
import { AUTO_DEPOSIT_PAYMENT_TYPES } from '../../auto-deposit.config';


const _settingsFacadeService = () => ({
  getSetting: jest.fn(() => of({} as SettingInfo))
});

describe('DepositTypeNavComponent', () => {
  let component: DepositTypeNavComponent;
  let fixture: ComponentFixture<DepositTypeNavComponent>;

  beforeEach(() => {
    
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [DepositTypeNavComponent],
      providers: [
        {
          provide: SettingsFacadeService,
          useFactory: _settingsFacadeService
        }
      ]
    });
    fixture = TestBed.createComponent(DepositTypeNavComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it('should set availableTypes on ngOnInit', () => {
    component.ngOnInit();
    
    component.isTimeBasedAvailable.subscribe((available) => {
      expect(available).toBe(true);
    });
    component.isLowBalanceAvailable.subscribe((available) => {
      expect(available).toBe(true);
    });
  });

  it('should emit onTypeChanged event when onTypeChange is called', () => {
    const mockValue = 2;
    const emitSpy = jest.spyOn(component.onTypeChanged, 'emit');
    const event = { detail: { value: mockValue } };
    component.onTypeChange(event as any);
    expect(component.activeType).toBe(mockValue);
    expect(emitSpy).toHaveBeenCalledWith(mockValue);
  });

  it('should return true for isLowBalanceAvailable when low balance setting is available and true', () => {
    const mockSettingsFacadeService = TestBed.inject(SettingsFacadeService);
    jest.spyOn(mockSettingsFacadeService, 'getSetting').mockReturnValue(of({ value: '1' }));
    component.ngOnInit();
    component.isLowBalanceAvailable.subscribe((available) => {
      expect(available).toBe(true);
    });
  });

  it('should return false for isLowBalanceAvailable when low balance setting is available and false', () => {
    const mockSettingsFacadeService = TestBed.inject(SettingsFacadeService);
    jest.spyOn(mockSettingsFacadeService, 'getSetting').mockReturnValue(of({ value: '0' }));
    component.ngOnInit();
    component.isLowBalanceAvailable.subscribe((available) => {
      expect(available).toBe(false);
    });
  });

  it('should return false for isLowBalanceAvailable when low balance setting is not available', () => {
    const mockSettingsFacadeService = TestBed.inject(SettingsFacadeService);
    jest.spyOn(mockSettingsFacadeService, 'getSetting').mockReturnValue(of(null));
    component.ngOnInit();
    component.isLowBalanceAvailable.subscribe((available) => {
      expect(available).toBe(false);
    });
  });

  it('should return true for isTimeBasedAvailable when time-based setting is available and true', () => {
    const mockSettingsFacadeService = TestBed.inject(SettingsFacadeService);
    jest.spyOn(mockSettingsFacadeService, 'getSetting').mockReturnValue(of({ value: '1' }));
    component.ngOnInit();
    component.isTimeBasedAvailable.subscribe((available) => {
      expect(available).toBe(true);
    });
  });

  it('should return false for isTimeBasedAvailable when time-based setting is available and false', () => {
    const mockSettingsFacadeService = TestBed.inject(SettingsFacadeService);
    jest.spyOn(mockSettingsFacadeService, 'getSetting').mockReturnValue(of({ value: '0' }));
    component.ngOnInit();
    component.isTimeBasedAvailable.subscribe((available) => {
      expect(available).toBe(false);
    });
  });

  it('should return false for isTimeBasedAvailable when time-based setting is not available', () => {
    const mockSettingsFacadeService = TestBed.inject(SettingsFacadeService);
    jest.spyOn(mockSettingsFacadeService, 'getSetting').mockReturnValue(of(null));
    component.ngOnInit();
    component.isTimeBasedAvailable.subscribe((available) => {
      expect(available).toBe(false);
    });
  });

  it('should return deposit types', () => {
    expect(component.autoDepositTypes).toEqual(AUTO_DEPOSIT_PAYMENT_TYPES);
  });
});
