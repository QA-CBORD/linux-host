import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DonateModalComponent } from './donate-modal.component';
import { ModalController } from '@ionic/angular';
import { TransactionUnitsPipeModule } from '@shared/pipes';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('DonateModalComponent', () => {
  let component: DonateModalComponent;
  let fixture: ComponentFixture<DonateModalComponent>;

  const modalController = {
    dismiss: jest.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DonateModalComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: ModalController, useValue: modalController }],
      imports: [TransactionUnitsPipeModule, HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(DonateModalComponent);
    component = fixture.componentInstance;
    // initialize every @input() property
    component.donateAmount$ = of('100');
    component.account$ = of('Account Info');
    component.data = {
      ['account']: { accountNumber: '123456789', accountType: 1 },
      amountValue: 2,
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should dismiss modal', () => {
    const dismissSpy = jest.spyOn(modalController, 'dismiss');
    component.onClickedDone();
    expect(dismissSpy).toHaveBeenCalled;
  });
});
