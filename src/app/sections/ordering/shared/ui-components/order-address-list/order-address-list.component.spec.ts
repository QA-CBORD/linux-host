import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderAddressListComponent } from './order-address-list.component';
import { OrderingService } from '@sections/ordering/services/ordering.service';
import { AddressInfo } from '@core/model/address/address-info';
import { ORDERING_CONTENT_STRINGS } from '@sections/ordering/ordering.config';

describe('OrderAddressListComponent', () => {
  let component: OrderAddressListComponent;
  let fixture: ComponentFixture<OrderAddressListComponent>;
  let mockOrderingService: Partial<OrderingService>;

  beforeEach(async () => {
    mockOrderingService = {
      getContentStringByName: jest.fn().mockReturnValue('Add new address'),
    };

    await TestBed.configureTestingModule({
      declarations: [OrderAddressListComponent],
      providers: [
        { provide: OrderingService, useValue: mockOrderingService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderAddressListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit onAddressSelected event when itemSelected is called', () => {
    const mockAddress = { id: '1', address1: '123 Main St', city: 'Springfield', state: 'IL', postalcode: '62701', country: 'US', onCampus: 1} as AddressInfo;
    const onAddressSelectedSpy = jest.spyOn(component.onAddressSelected, 'emit');

    component.itemSelected(mockAddress);
    expect(onAddressSelectedSpy).toHaveBeenCalledWith(mockAddress);
  });

  it('should emit onAddNewAddress event when onAddNewAddressClick is called', () => {
    const onAddNewAddressSpy = jest.spyOn(component.onAddNewAddress, 'emit');
    component.onAddNewAddressClick();
    expect(onAddNewAddressSpy).toHaveBeenCalled();
  });

  it('should set labelAddNewAddress on ngOnInit', () => {
    const expectedLabel = 'Add new address';

    component.ngOnInit();

    expect(component.contentStrings.labelAddNewAddress).toBe(expectedLabel);
    expect(mockOrderingService.getContentStringByName).toHaveBeenCalledWith(ORDERING_CONTENT_STRINGS.labelAddNewAddress);
  });
});