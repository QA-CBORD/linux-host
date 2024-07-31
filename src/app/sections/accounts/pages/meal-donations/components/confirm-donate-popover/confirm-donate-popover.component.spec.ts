import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmDonatePopoverComponent } from './confirm-donate-popover.component';
import { TransactionUnitsPipeModule } from '@shared/pipes';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { buttons } from '@core/utils/buttons.config';
import { PopoverConfig } from '@core/model/popover/popover.model';

describe('ConfirmDonatePopoverComponent', () => {
  let component: ConfirmDonatePopoverComponent;
  let fixture: ComponentFixture<ConfirmDonatePopoverComponent>;

  //refactor this test suite to use beforeEach

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmDonatePopoverComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [TransactionUnitsPipeModule, HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(ConfirmDonatePopoverComponent);
    component = fixture.componentInstance;
    component.policyTitle$ = of('Policy Title');
    component.policyContent$ = of('Policy Content');
    component.buttonDonate$ = of('Donate');
    component.buttonCancel$ = of('Cancel');
    component.donateAmount$ = of('100');
    component.account$ = of('Account Info');
    component.confirmationTitle$ = of('Confirm Your Donation');
    component.data = {
      ['account']: { accountNumber: '123456789', accountType: 1 },
      amountValue: 2,
    } as any;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should initialize popoverConfig correctly in ngOnInit', () => {
    component.ngOnInit();
    expect(component.popoverConfig.title).toBe('Confirm Donate');
    expect(component.popoverConfig.type).toBe('SUCCESS');
    expect(component.popoverConfig.buttons).toEqual([
      { ...buttons.CANCEL, label: 'CANCEL' },
      { ...buttons.OKAY, label: 'DONATE' },
    ]);
    expect(component.popoverConfig.message).toEqual(component.data);
  });

  it('should update popoverConfig with async values', async () => {
    await component['updateConfig']();
    expect(component.popoverConfig.title).toBe('Confirm Your Donation');
    expect(component.popoverConfig.buttons[0].label).toBe('CANCEL');
    expect(component.popoverConfig.buttons[1].label).toBe('DONATE');
  });
});
