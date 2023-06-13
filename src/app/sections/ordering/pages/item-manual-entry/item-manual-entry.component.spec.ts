import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CartService } from '@sections/ordering';
import { ToastService } from '@core/service/toast/toast.service';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { ModalController } from '@ionic/angular';
import { ItemManualEntryComponent } from './item-manual-entry.component';

describe('ItemManualEntryComponent', () => {
  let component: ItemManualEntryComponent;
  let fixture: ComponentFixture<ItemManualEntryComponent>;

  beforeEach(() => {
    const changeDetectorRefStub = () => ({ detectChanges: () => ({}) });
    const formBuilderStub = () => ({ group: object => ({}) });
    const cartServiceStub = () => ({
      getMenuItemByCode: value => ({ subscribe: f => f({}) })
    });
    const toastServiceStub = () => ({ showToast: object => ({}) });
    const contentStringsFacadeServiceStub = () => ({});
    const modalControllerStub = () => ({ dismiss: object => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ItemManualEntryComponent],
      providers: [
        { provide: ChangeDetectorRef, useFactory: changeDetectorRefStub },
        { provide: FormBuilder, useFactory: formBuilderStub },
        { provide: CartService, useFactory: cartServiceStub },
        { provide: ToastService, useFactory: toastServiceStub },
        {
          provide: ContentStringsFacadeService,
          useFactory: contentStringsFacadeServiceStub
        },
        { provide: ModalController, useFactory: modalControllerStub }
      ]
    });
    fixture = TestBed.createComponent(ItemManualEntryComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const changeDetectorRefStub: ChangeDetectorRef = fixture.debugElement.injector.get(
        ChangeDetectorRef
      );
      const formBuilderStub: FormBuilder = fixture.debugElement.injector.get(
        FormBuilder
      );
      spyOn(changeDetectorRefStub, 'detectChanges').and.callThrough();
      spyOn(formBuilderStub, 'group').and.callThrough();
      component.ngOnInit();
      expect(changeDetectorRefStub.detectChanges).toHaveBeenCalled();
      expect(formBuilderStub.group).toHaveBeenCalled();
    });
  });

  describe('continue', () => {
    it('makes expected calls', () => {
      const cartServiceStub: CartService = fixture.debugElement.injector.get(
        CartService
      );
      const toastServiceStub: ToastService = fixture.debugElement.injector.get(
        ToastService
      );
      const modalControllerStub: ModalController = fixture.debugElement.injector.get(
        ModalController
      );
      spyOn(cartServiceStub, 'getMenuItemByCode').and.callThrough();
      spyOn(toastServiceStub, 'showToast').and.callThrough();
      spyOn(modalControllerStub, 'dismiss').and.callThrough();
      component.continue();
      expect(cartServiceStub.getMenuItemByCode).toHaveBeenCalled();
      expect(toastServiceStub.showToast).toHaveBeenCalled();
      expect(modalControllerStub.dismiss).toHaveBeenCalled();
    });
  });

  describe('close', () => {
    it('makes expected calls', () => {
      const modalControllerStub: ModalController = fixture.debugElement.injector.get(
        ModalController
      );
      spyOn(modalControllerStub, 'dismiss').and.callThrough();
      component.close();
      expect(modalControllerStub.dismiss).toHaveBeenCalled();
    });
  });
});
