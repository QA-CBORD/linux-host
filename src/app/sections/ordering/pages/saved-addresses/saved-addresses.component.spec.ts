import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AddressInfo } from '@core/model/address/address-info';
import { LoadingService } from '@core/service/loading/loading.service';
import { MerchantService } from '@sections/ordering/services';
import { OrderingService } from '@sections/ordering/services/ordering.service';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { SavedAddressesComponent } from './saved-addresses.component';

describe('SavedAddressesComponent', () => {
  let component: SavedAddressesComponent;
  let fixture: ComponentFixture<SavedAddressesComponent>;

  beforeEach(() => {
    const loadingServiceStub = () => ({
      showSpinner: () => ({}),
      closeSpinner: () => ({})
    });
    const merchantServiceStub = () => ({
      retrieveBuildings: () => ({}),
      selectedAddress: {},
      updateUserAddress: value => ({})
    });
    const orderingServiceStub = () => ({
      getContentStringByName: buttonCancel => ({})
    });
    const userFacadeServiceStub = () => ({ getUserAddresses$: () => ({}) });
    const settingsFacadeServiceStub = () => ({
      saveUserSetting: (dEFAULT_ADDRESS, arg) => ({}),
      getSetting: aDDRESS_RESTRICTION => ({}),
      getUserSetting: dEFAULT_ADDRESS => ({})
    });
    const routerStub = () => ({ navigate: array => ({}) });
    const activatedRouteStub = () => ({
      data: { pipe: () => ({ toPromise: () => ({ relativeRoute: {} }) }) }
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SavedAddressesComponent],
      providers: [
        { provide: LoadingService, useFactory: loadingServiceStub },
        { provide: MerchantService, useFactory: merchantServiceStub },
        { provide: OrderingService, useFactory: orderingServiceStub },
        { provide: UserFacadeService, useFactory: userFacadeServiceStub },
        {
          provide: SettingsFacadeService,
          useFactory: settingsFacadeServiceStub
        },
        { provide: Router, useFactory: routerStub },
        { provide: ActivatedRoute, useFactory: activatedRouteStub }
      ]
    });
    fixture = TestBed.createComponent(SavedAddressesComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`errorState has default value`, () => {
    expect(component.errorState).toEqual(false);
  });

  it(`addNewAdddressState has default value`, () => {
    expect(component.addNewAdddressState).toEqual(false);
  });

  describe('onAddressSelected', () => {
    it('makes expected calls', () => {
      const addressInfoStub: AddressInfo = <any>{};
      const routerStub: Router = fixture.debugElement.injector.get(Router);
     jest.spyOn(routerStub, 'navigate');
      component.onAddressSelected(addressInfoStub);
      expect(routerStub.navigate).toHaveBeenCalled();
    });
  });

  describe('ionViewWillEnter', () => {
    it('makes expected calls', () => {
      const merchantServiceStub: MerchantService = fixture.debugElement.injector.get(
        MerchantService
      );
     jest.spyOn(merchantServiceStub, 'retrieveBuildings');
      component.ionViewWillEnter();
      expect(merchantServiceStub.retrieveBuildings).toHaveBeenCalled();
    });
  });

  describe('addAddress', () => {
    it('makes expected calls', () => {
      const loadingServiceStub: LoadingService = fixture.debugElement.injector.get(
        LoadingService
      );
      const merchantServiceStub: MerchantService = fixture.debugElement.injector.get(
        MerchantService
      );
      const settingsFacadeServiceStub: SettingsFacadeService = fixture.debugElement.injector.get(
        SettingsFacadeService
      );
     jest.spyOn(loadingServiceStub, 'showSpinner');
     jest.spyOn(loadingServiceStub, 'closeSpinner');
     jest.spyOn(merchantServiceStub, 'updateUserAddress');
     jest.spyOn(settingsFacadeServiceStub, 'saveUserSetting');
      component.addAddress();
      expect(loadingServiceStub.showSpinner).toHaveBeenCalled();
      expect(loadingServiceStub.closeSpinner).toHaveBeenCalled();
      expect(merchantServiceStub.updateUserAddress).toHaveBeenCalled();
      expect(settingsFacadeServiceStub.saveUserSetting).toHaveBeenCalled();
    });
  });
});
