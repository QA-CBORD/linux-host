import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CartService } from '@sections/ordering/services';
import { MerchantService } from '@sections/ordering/services';
import { ChangeDetectorRef } from '@angular/core';
import { LoadingService } from '@core/service/loading/loading.service';
import { OrderingService } from '@sections/ordering/services/ordering.service';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { DateTimeSelected } from '../st-date-time-picker/st-date-time-picker.component';
import { ToastService } from '@core/service/toast/toast.service';
import { AccessibilityService } from '@shared/accessibility/services/accessibility.service';
import { AddressHeaderFormatPipe } from '@shared/pipes/address-header-format-pipe';
import { ModalsService } from '@core/service/modals/modals.service';
import { OrderOptionsActionSheetComponent } from './order-options.action-sheet.component';

describe('OrderOptionsActionSheetComponent', () => {
  let component: OrderOptionsActionSheetComponent;
  let fixture: ComponentFixture<OrderOptionsActionSheetComponent>;

  beforeEach(() => {
    const cartServiceStub = () => ({
      resetClientOrderId: () => ({}),
      orderDetailsOptions$: {},
      orderIsAsap: {},
      getMerchantMenu: (id, dueTime, type) => ({}),
      extractTimeZonedString: (selectedTimeStamp, timeZone) => ({})
    });
    const merchantServiceStub = () => ({
      getMerchantOrderSchedule: (merchantId, pICKUP, timeZone) => ({}),
      retrievePickupLocations: (storeAddress, arg1) => ({}),
      retrieveBuildings: () => ({}),
      menuMerchants$: { pipe: () => ({}) },
      getCurrentLocaleTime: timeZone => ({ pipe: () => ({}) }),
      isOutsideMerchantDeliveryArea: (merchantId, latitude, longitude) => ({}),
      getMerchantPaymentAccounts: merchantId => ({}),
      getUserAccounts: () => ({ pipe: () => ({}) }),
      retrieveDeliveryAddresses: merchantId => ({})
    });
    const changeDetectorRefStub = () => ({ detectChanges: () => ({}) });
    const loadingServiceStub = () => ({
      showSpinner: () => ({}),
      closeSpinner: () => ({})
    });
    const orderingServiceStub = () => ({
      getContentStringByName: buttonDismiss => ({})
    });
    const userFacadeServiceStub = () => ({});
    const toastServiceStub = () => ({ showToast: object => ({}) });
    const accessibilityServiceStub = () => ({ readAloud: arg => ({}) });
    const addressHeaderFormatPipeStub = () => ({ transform: address => ({}) });
    const modalsServiceStub = () => ({
      dismiss: (object, cONTINUE) => ({}),
      create: object => ({
        onDidDismiss: () => ({ then: () => ({}) }),
        present: () => ({})
      })
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [OrderOptionsActionSheetComponent],
      providers: [
        { provide: CartService, useFactory: cartServiceStub },
        { provide: MerchantService, useFactory: merchantServiceStub },
        { provide: ChangeDetectorRef, useFactory: changeDetectorRefStub },
        { provide: LoadingService, useFactory: loadingServiceStub },
        { provide: OrderingService, useFactory: orderingServiceStub },
        { provide: UserFacadeService, useFactory: userFacadeServiceStub },
        { provide: ToastService, useFactory: toastServiceStub },
        { provide: AccessibilityService, useFactory: accessibilityServiceStub },
        {
          provide: AddressHeaderFormatPipe,
          useFactory: addressHeaderFormatPipeStub
        },
        { provide: ModalsService, useFactory: modalsServiceStub }
      ]
    });
    fixture = TestBed.createComponent(OrderOptionsActionSheetComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`showNavBarOnDestroy has default value`, () => {
    expect(component.showNavBarOnDestroy).toEqual(true);
  });

  describe('onDateTimeSelected', () => {
    it('makes expected calls', () => {
      const changeDetectorRefStub: ChangeDetectorRef = fixture.debugElement.injector.get(
        ChangeDetectorRef
      );
      const dateTimeSelectedStub: DateTimeSelected = <any>{};
      spyOn(changeDetectorRefStub, 'detectChanges').and.callThrough();
      component.onDateTimeSelected(dateTimeSelectedStub);
      expect(changeDetectorRefStub.detectChanges).toHaveBeenCalled();
    });
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const cartServiceStub: CartService = fixture.debugElement.injector.get(
        CartService
      );
      spyOn(component, 'dispatchingData').and.callThrough();
      spyOn(cartServiceStub, 'resetClientOrderId').and.callThrough();
      component.ngOnInit();
      expect(component.dispatchingData).toHaveBeenCalled();
      expect(cartServiceStub.resetClientOrderId).toHaveBeenCalled();
    });
  });

  describe('dispatchingData', () => {
    it('makes expected calls', () => {
      const merchantServiceStub: MerchantService = fixture.debugElement.injector.get(
        MerchantService
      );
      const loadingServiceStub: LoadingService = fixture.debugElement.injector.get(
        LoadingService
      );
      spyOn(component, 'defineOrderOptionsData').and.callThrough();
      spyOn(merchantServiceStub, 'getMerchantOrderSchedule').and.callThrough();
      spyOn(merchantServiceStub, 'retrievePickupLocations').and.callThrough();
      spyOn(merchantServiceStub, 'retrieveBuildings').and.callThrough();
      spyOn(loadingServiceStub, 'showSpinner').and.callThrough();
      spyOn(loadingServiceStub, 'closeSpinner').and.callThrough();
      component.dispatchingData();
      expect(component.defineOrderOptionsData).toHaveBeenCalled();
      expect(merchantServiceStub.getMerchantOrderSchedule).toHaveBeenCalled();
      expect(merchantServiceStub.retrievePickupLocations).toHaveBeenCalled();
      expect(merchantServiceStub.retrieveBuildings).toHaveBeenCalled();
      expect(loadingServiceStub.showSpinner).toHaveBeenCalled();
      expect(loadingServiceStub.closeSpinner).toHaveBeenCalled();
    });
  });
});
