import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, ModalController } from '@ionic/angular';
import { DepositModalComponent } from './deposit-modal.component';
import { CreditCardTypePipeModule } from '../../pipes/credit-card-type/credit-card-type.module';
import { TransactionUnitsPipeModule } from '@shared/pipes';
import { StButtonModule } from '@shared/ui-components';
import { AccountService } from '@sections/accounts/services/accounts.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DepositModalComponent', () => {
  let component: DepositModalComponent;
  let fixture: ComponentFixture<DepositModalComponent>;
  let modalController: ModalController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DepositModalComponent],
      imports: [IonicModule, CreditCardTypePipeModule, TransactionUnitsPipeModule, StButtonModule, HttpClientTestingModule],
      providers: [{ provide: ModalController, useValue: { dismiss: () => { } } }, AccountService],
    }).compileComponents();

    fixture = TestBed.createComponent(DepositModalComponent);
    component = fixture.componentInstance;
    modalController = TestBed.inject(ModalController);
    component.data = { amount: 100, selectedAccount: { accountType: "test" }, sourceAcc: 'Apple Pay' };
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should close the modal when onClickedDone is called', async () => {
    jest.spyOn(modalController, 'dismiss');
    await component.onClickedDone();
    expect(modalController.dismiss).toHaveBeenCalled();
  });
});