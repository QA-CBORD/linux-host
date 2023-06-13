import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MerchantService } from '@sections/ordering/services';
import { LoadingService } from '@core/service/loading/loading.service';
import { AddressInfo } from '@core/model/address/address-info';
import { OrderingService } from '@sections/ordering/services/ordering.service';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { DeliveryAddressesModalComponent } from './delivery-addresses.modal.component';

describe('DeliveryAddressesModalComponent', () => {
  let component: DeliveryAddressesModalComponent;
  let fixture: ComponentFixture<DeliveryAddressesModalComponent>;

  beforeEach(() => {
    const changeDetectorRefStub = () => ({ detectChanges: () => ({}) });
    const modalControllerStub = () => ({ dismiss: selectedAddress => ({}) });
    const merchantServiceStub = () => ({
      retrieveBuildings: () => ({}),
      updateUserAddress: value => ({}),
      filterDeliveryAddresses: (merchantId, array) => ({})
    });
    const loadingServiceStub = () => ({
      showSpinner: () => ({}),
      closeSpinner: () => ({})
    });
    const orderingServiceStub = () => ({
      getContentStringByName: buttonCancel => ({})
    });
    const settingsFacadeServiceStub = () => ({
      saveUserSetting: (dEFAULT_ADDRESS, arg) => ({})
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [DeliveryAddressesModalComponent],
      providers: [
        { provide: ChangeDetectorRef, useFactory: changeDetectorRefStub },
        { provide: ModalController, useFactory: modalControllerStub },
        { provide: MerchantService, useFactory: merchantServiceStub },
        { provide: LoadingService, useFactory: loadingServiceStub },
        { provide: OrderingService, useFactory: orderingServiceStub },
        {
          provide: SettingsFacadeService,
          useFactory: settingsFacadeServiceStub
        }
      ]
    });
    fixture = TestBed.createComponent(DeliveryAddressesModalComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`addNewAdddressState has default value`, () => {
    expect(component.addNewAdddressState).toEqual(false);
  });

  it(`errorState has default value`, () => {
    expect(component.errorState).toEqual(false);
  });

  describe('onClickedDone', () => {
    it('makes expected calls', () => {
      const modalControllerStub: ModalController = fixture.debugElement.injector.get(
        ModalController
      );
      const addressInfoStub: AddressInfo = <any>{};
      spyOn(modalControllerStub, 'dismiss').and.callThrough();
      component.onClickedDone(addressInfoStub);
      expect(modalControllerStub.dismiss).toHaveBeenCalled();
    });
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const merchantServiceStub: MerchantService = fixture.debugElement.injector.get(
        MerchantService
      );
      spyOn(merchantServiceStub, 'retrieveBuildings').and.callThrough();
      component.ngOnInit();
      expect(merchantServiceStub.retrieveBuildings).toHaveBeenCalled();
    });
  });

  describe('addAddress', () => {
    it('makes expected calls', () => {
      const changeDetectorRefStub: ChangeDetectorRef = fixture.debugElement.injector.get(
        ChangeDetectorRef
      );
      const merchantServiceStub: MerchantService = fixture.debugElement.injector.get(
        MerchantService
      );
      const loadingServiceStub: LoadingService = fixture.debugElement.injector.get(
        LoadingService
      );
      const settingsFacadeServiceStub: SettingsFacadeService = fixture.debugElement.injector.get(
        SettingsFacadeService
      );
      spyOn(component, 'resetForm').and.callThrough();
      spyOn(changeDetectorRefStub, 'detectChanges').and.callThrough();
      spyOn(merchantServiceStub, 'updateUserAddress').and.callThrough();
      spyOn(merchantServiceStub, 'filterDeliveryAddresses').and.callThrough();
      spyOn(loadingServiceStub, 'showSpinner').and.callThrough();
      spyOn(loadingServiceStub, 'closeSpinner').and.callThrough();
      spyOn(settingsFacadeServiceStub, 'saveUserSetting').and.callThrough();
      component.addAddress();
      expect(component.resetForm).toHaveBeenCalled();
      expect(changeDetectorRefStub.detectChanges).toHaveBeenCalled();
      expect(merchantServiceStub.updateUserAddress).toHaveBeenCalled();
      expect(merchantServiceStub.filterDeliveryAddresses).toHaveBeenCalled();
      expect(loadingServiceStub.showSpinner).toHaveBeenCalled();
      expect(loadingServiceStub.closeSpinner).toHaveBeenCalled();
      expect(settingsFacadeServiceStub.saveUserSetting).toHaveBeenCalled();
    });
  });
});
