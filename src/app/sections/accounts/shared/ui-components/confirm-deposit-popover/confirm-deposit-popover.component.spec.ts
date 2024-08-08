import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmDepositPopoverComponent } from './confirm-deposit-popover.component';
import { TransactionUnitsPipeModule } from '@shared/pipes/transaction-units';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CreditCardTypePipeModule } from '../../pipes/credit-card-type/credit-card-type.module';
import { IonicModule } from '@ionic/angular';
import { StPopoverLayoutModule } from '@shared/ui-components/st-popover-layout/st-popover-layout.module';

describe('ConfirmDepositPopoverComponent', () => {
  let component: ConfirmDepositPopoverComponent;
  let fixture: ComponentFixture<ConfirmDepositPopoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmDepositPopoverComponent],
      imports: [IonicModule, TransactionUnitsPipeModule, CreditCardTypePipeModule, HttpClientTestingModule, StPopoverLayoutModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDepositPopoverComponent);
    component = fixture.componentInstance;
    component.data = { amount: 100, selectedAccount: { accountType: "test" }, sourceAcc: 'Apple Pay' };
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the popover configuration', () => {
    expect(component.popoverConfig).toBeDefined();
  });

  it('should set the data input', () => {
    const data = { amount: 100 };
    component.data = data;
    expect(component.data).toEqual(data);
  });

  it('should set the contentString input', () => {
    const contentString = { title: 'Confirm Deposit' } as any;
    component.contentString = contentString;
    expect(component.contentString).toEqual(contentString);
  });

  it('should set the instructions input', () => {
    const instructions = 'Please follow the instructions below:';
    component.instructions = instructions;
    expect(component.instructions).toEqual(instructions);
  });

  it('should return the deposit instructions', () => {
    const instructions = 'Please follow the instructions below:';
    component.instructions = instructions;
    expect(component.showDepositInstructions).toEqual(instructions);
  });

  it('should set the instructions bill me', () => {
    const instructions = 'Please follow the instructions below:';
    component.data = { amount: 100, selectedAccount: { accountType: "test" }, sourceAcc: 'Apple Pay',  billme: true  };
    component.ngOnInit();
    component.showDepositInstructions;
    component.instructions = instructions;
    expect(component.instructions).toEqual(instructions);
  });
});