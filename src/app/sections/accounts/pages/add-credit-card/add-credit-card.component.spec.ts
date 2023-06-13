import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { AddCreditCardService } from './services/add-credit-card.service';
import { LoadingService } from 'src/app/core/service/loading/loading.service';
import { ToastService } from '@core/service/toast/toast.service';
import { AddCreditCardComponent } from './add-credit-card.component';

describe('AddCreditCardComponent', () => {
  let component: AddCreditCardComponent;
  let fixture: ComponentFixture<AddCreditCardComponent>;

  beforeEach(() => {
    const formBuilderStub = () => ({ group: object => ({}) });
    const navControllerStub = () => ({ pop: () => ({}) });
    const popoverControllerStub = () => ({
      create: object => ({
        onDidDismiss: () => ({ then: () => ({}) }),
        present: () => ({})
      })
    });
    const addCreditCardServiceStub = () => ({
      createAccount: (
        nameOnCC,
        nameOnCC1,
        accountTender,
        mediaValue,
        securityCode,
        expirationMonth,
        expirationYear,
        billingAddressObject
      ) => ({ pipe: () => ({ subscribe: f => f({}) }) }),
      getCardType: number => ({}),
      formatExpirationDate: string => ({})
    });
    const loadingServiceStub = () => ({
      showSpinner: () => ({}),
      closeSpinner: () => ({})
    });
    const toastServiceStub = () => ({ showToast: object => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [AddCreditCardComponent],
      providers: [
        { provide: FormBuilder, useFactory: formBuilderStub },
        { provide: NavController, useFactory: navControllerStub },
        { provide: PopoverController, useFactory: popoverControllerStub },
        { provide: AddCreditCardService, useFactory: addCreditCardServiceStub },
        { provide: LoadingService, useFactory: loadingServiceStub },
        { provide: ToastService, useFactory: toastServiceStub }
      ]
    });
    fixture = TestBed.createComponent(AddCreditCardComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('onFormSubmit', () => {
    it('makes expected calls', () => {
      const addCreditCardServiceStub: AddCreditCardService = fixture.debugElement.injector.get(
        AddCreditCardService
      );
      const loadingServiceStub: LoadingService = fixture.debugElement.injector.get(
        LoadingService
      );
      spyOn(addCreditCardServiceStub, 'createAccount').and.callThrough();
      spyOn(loadingServiceStub, 'showSpinner').and.callThrough();
      spyOn(loadingServiceStub, 'closeSpinner').and.callThrough();
      component.onFormSubmit();
      expect(addCreditCardServiceStub.createAccount).toHaveBeenCalled();
      expect(loadingServiceStub.showSpinner).toHaveBeenCalled();
      expect(loadingServiceStub.closeSpinner).toHaveBeenCalled();
    });
  });
});
