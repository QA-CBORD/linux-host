import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeliveryAddressesModalComponent } from './delivery-addresses.modal.component';
import { AddressInfo } from '@core/model/address/address-info';
import { MerchantService } from '@sections/ordering/services';
import { IonicModule, ModalController } from '@ionic/angular';
import { OrderingComponentContentStrings, OrderingService } from '@sections/ordering/services/ordering.service';
import { SettingsApiService } from '@core/service/settings-api-service/settings-api.service';
import { of } from 'rxjs';
import { Building } from '@sections/housing/building/building.model';
import { BuildingInfo } from '../../models';
import { LoadingService } from '@core/service/loading/loading.service';

describe('DeliveryAddressesModalComponent', () => {
  let component: DeliveryAddressesModalComponent;
  let fixture: ComponentFixture<DeliveryAddressesModalComponent>;
  let merchantService;
  let modalController;
  let orderingService;
  let settingsFacadeService;
  let loadingService;

  beforeEach(async () => {
    merchantService = {
      retrieveBuildings: jest.fn(),
      updateUserAddress: jest.fn(),
      filterDeliveryAddresses: jest.fn(),
    };

    modalController = {
      dismiss: jest.fn(),
    };

    orderingService = {
      getContentStringByName: jest.fn(() => of('Room')),
    };

    settingsFacadeService = {
      getSettings: jest.fn(),
    };

    loadingService = {
      showSpinner: jest.fn(),
      closeSpinner: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [DeliveryAddressesModalComponent],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: MerchantService, useValue: merchantService },
        { provide: ModalController, useValue: modalController },
        { provide: OrderingService, useValue: orderingService },
        { provide: SettingsApiService, useValue: settingsFacadeService },
        { provide: LoadingService, useValue: loadingService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DeliveryAddressesModalComponent);
    component = fixture.componentInstance;
  });

  it('should set selectedAddress and listOfAddresses on ngOnInit', () => {
    const mockDefaultAddress = { id: '123' } as AddressInfo;
    component.defaultAddress = mockDefaultAddress;
    component.isOrderTypePickup = false;
    component.deliveryAddresses = [{ id: '456' } as AddressInfo]; // Add this line

    component.ngOnInit();

    expect(component.selectedAddress).toBe(mockDefaultAddress);
    expect(component.listOfAddresses).toBeDefined();
  });

  it('should dismiss modal with selectedAddress on onClickedDone', async () => {
    const mockAddress = { id: '123' } as AddressInfo;

    await component.onClickedDone(mockAddress);

    expect(modalController.dismiss).toHaveBeenCalledWith(mockAddress);
  });

  it('should set errorState to true if addAddress is called with invalid form', () => {
    component.addNewAdddressForm = { valid: false } as any;

    component.addAddress();

    expect(component.errorState).toBe(true);
  });

  it('should set selectedAddress on onRadioGroupChanged', () => {
    const mockEvent = { target: { value: '123' } };

    component.onRadioGroupChanged(mockEvent);

    expect(component.selectedAddress).toBe('123');
  });

  it('should set addNewAdddressForm and errorState on onAddressFormChanged', () => {
    const mockEvent = { valid: true } as any;

    component.onAddressFormChanged(mockEvent);

    expect(component.addNewAdddressForm).toBe(mockEvent);
    expect(component.errorState).toBe(false);
  });

  it('should reset addNewAdddressState and addNewAdddressForm on resetForm', () => {
    component.addNewAdddressState = false;
    component.addNewAdddressForm = { valid: true } as any;

    component.resetForm();

    expect(component.addNewAdddressState).toBe(true);
    expect(component.addNewAdddressForm).toBeNull();
  });

  it('should set nickname when isOncampus is true', () => {
    const mockFormValue = {
      building: 'Building A',
      room: 'Room 101',
    };
    const mockBuildings = [
      {
        id: '1',
        objectRevision: 1,
        active: true,
        institutionId: '1',
        address: {} as AddressInfo,
      },
    ] as BuildingInfo[];
    component.addNewAdddressForm = { value: mockFormValue, valid: true };

    jest.spyOn(component['orderingService'], 'getContentStringByName').mockReturnValueOnce(of('Room'));
    jest.spyOn(component['merchantService'], 'retrieveBuildings').mockReturnValue(of(mockBuildings));

    component['getBuildingData$'](true).subscribe(() => {
      expect(component.addNewAdddressForm.value.nickname).toBe('Building A, Room 101');
    });
  });

  it('should not set nickname when isOncampus is false', () => {
    component.addNewAdddressForm = { value: {}, valid: false };

    jest.spyOn(component['orderingService'], 'getContentStringByName').mockReturnValueOnce(of('Room'));
    component['getBuildingData$'](false).subscribe(() => {
      expect(component.addNewAdddressForm.value.nickname).toBeUndefined();
    });
  });

  it('should set listOfAddresses on defineListOfAddresses', () => {
    const mockDefaultAddress = { id: '123' } as AddressInfo;
    component.defaultAddress = mockDefaultAddress;
    component.isOrderTypePickup = false;
    component.deliveryAddresses = [{ id: '456' } as AddressInfo];

    const result = component['defineListOfAddresses'](mockDefaultAddress);

    expect(result).toBeDefined();
  });

  it('should call merchantService.retrieveBuildings on ngOnInit', () => {
    component.pickupLocations = [{ id: '123' } as AddressInfo];
    component.deliveryAddresses = [{ id: '456' } as AddressInfo];
    jest.spyOn(component['merchantService'], 'retrieveBuildings').mockReturnValue(of([]));
    component.isOrderTypePickup = false;
    component.ngOnInit();
    expect(component['merchantService'].retrieveBuildings).toHaveBeenCalled();
  });

  it('should call loadingService.showSpinner on addAddress', () => {
    const mockFormValue = {
      campus: '1',
      default: true,
    };
    const mockAddedAddress = {
      id: '123',
      address1: '123 Main St',
      city: 'Springfield',
      state: 'IL',
      postalcode: '62701',
      country: 'US',
      onCampus: 1,
    } as AddressInfo;

    component.addNewAdddressForm = { value: mockFormValue, valid: true } as any;
    jest.spyOn(component['merchantService'], 'updateUserAddress').mockReturnValue(of(mockAddedAddress));
    jest.spyOn(component['merchantService'], 'filterDeliveryAddresses').mockReturnValue(of([mockAddedAddress]));
    jest.spyOn(component['settingsFacadeService'], 'saveUserSetting').mockReturnValue(of(true));

    component.addAddress();

    expect(loadingService.showSpinner).toHaveBeenCalled();
  });
});
