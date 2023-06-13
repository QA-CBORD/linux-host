import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { ToastService } from '@core/service/toast/toast.service';
import { AlertController } from '@ionic/angular';
import { Recipient } from '@sections/guest/model/recipient.model';
import { GuestDepositsService } from '@sections/guest/services/guest-deposits.service';
import { CommonService } from '@shared/services/common.service';
import { FormsModule } from '@angular/forms';
import { IdentifyRecipientComponent } from './identify-recipient.component';

describe('IdentifyRecipientComponent', () => {
  let component: IdentifyRecipientComponent;
  let fixture: ComponentFixture<IdentifyRecipientComponent>;

  beforeEach(() => {
    const changeDetectorRefStub = () => ({ detectChanges: () => ({}) });
    const formBuilderStub = () => ({
      group: object => ({}),
      array: arg => ({})
    });
    const activatedRouteStub = () => ({ data: { subscribe: f => f({}) } });
    const routerStub = () => ({ navigate: (array, object) => ({}) });
    const institutionFacadeServiceStub = () => ({
      retrieveAnonymousDepositFields: () => ({
        toPromise: () => ({ then: () => ({ finally: () => ({}) }) })
      })
    });
    const loadingServiceStub = () => ({
      showSpinner: () => ({}),
      closeSpinner: () => ({})
    });
    const toastServiceStub = () => ({ showToast: object => ({}) });
    const alertControllerStub = () => ({
      create: object => ({ present: () => ({}) })
    });
    const guestDepositsServiceStub = () => ({
      retrieveAndSaveRecipientByCashlessFields: (
        arg,
        array,
        array1,
        saveNewRecipient
      ) => ({ then: () => ({ catch: () => ({ finally: () => ({}) }) }) }),
      saveRecipientList: updatedList => ({})
    });
    const commonServiceStub = () => ({ getString: identifyRecipient => ({}) });
    TestBed.configureTestingModule({
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [IdentifyRecipientComponent],
      providers: [
        { provide: ChangeDetectorRef, useFactory: changeDetectorRefStub },
        { provide: FormBuilder, useFactory: formBuilderStub },
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: Router, useFactory: routerStub },
        {
          provide: InstitutionFacadeService,
          useFactory: institutionFacadeServiceStub
        },
        { provide: LoadingService, useFactory: loadingServiceStub },
        { provide: ToastService, useFactory: toastServiceStub },
        { provide: AlertController, useFactory: alertControllerStub },
        { provide: GuestDepositsService, useFactory: guestDepositsServiceStub },
        { provide: CommonService, useFactory: commonServiceStub }
      ]
    });
    fixture = TestBed.createComponent(IdentifyRecipientComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`newRecipientFormName has default value`, () => {
    expect(component.newRecipientFormName).toEqual(`newRecipient`);
  });

  it(`newRecepientFormRef has default value`, () => {
    expect(component.newRecepientFormRef).toEqual([]);
  });

  it(`recipients has default value`, () => {
    expect(component.recipients).toEqual([]);
  });

  describe('presentRemoveConfirm', () => {
    it('makes expected calls', () => {
      const alertControllerStub: AlertController = fixture.debugElement.injector.get(
        AlertController
      );
      const recipientStub: Recipient = <any>{};
      spyOn(alertControllerStub, 'create').and.callThrough();
      component.presentRemoveConfirm(recipientStub);
      expect(alertControllerStub.create).toHaveBeenCalled();
    });
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'initComponentData').and.callThrough();
      component.ngOnInit();
      expect(component.initComponentData).toHaveBeenCalled();
    });
  });

  describe('initComponentData', () => {
    it('makes expected calls', () => {
      const commonServiceStub: CommonService = fixture.debugElement.injector.get(
        CommonService
      );
      spyOn(commonServiceStub, 'getString').and.callThrough();
      component.initComponentData();
      expect(commonServiceStub.getString).toHaveBeenCalled();
    });
  });
});
