import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderAddressItemComponent } from './order-address-item.component';
import { AddressInfo } from '@core/model/address/address-info';
import { AddressHeaderFormatPipeModule } from '@shared/pipes/address-header-format-pipe/address-header-format-pipe.module';
import { AddressSubHeaderFormatPipeModule } from '@shared/pipes/address-subheader-format-pipe/address-subheader-format-pipe.module';

describe('OrderAddressItemComponent', () => {
  let component: OrderAddressItemComponent;
  let fixture: ComponentFixture<OrderAddressItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderAddressItemComponent],
      imports: [AddressHeaderFormatPipeModule, AddressSubHeaderFormatPipeModule],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderAddressItemComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set isDefault and iconIsFile correctly on ngOnInit', () => {
    const mockItem = { id: '123' } as AddressInfo;
    component.item = mockItem;
    component.defaultAddress = '123';
    component.iconNameDefault = 'star-outline.svg';
    component.iconNameSelected = 'star-filled.svg';
    component.isSelected = false;
    component.ngOnInit();
    expect(component.isDefault).toBe(true);
    expect(component.iconIsFile).toBe(true);
  });

  it('should return correct iconSrc', () => {
    component.iconIsFile = true;
    component.iconNameDefault = 'star-outline.svg';
    const iconSrc = component.iconSrc;
    expect(iconSrc).toBe('./assets/icon/star-outline.svg');
  });

  it('should return correct iconSrc when there is no iconFile', () => {
    component.iconIsFile = false;
    component.iconNameDefault = 'star-outline.svg';
    const iconSrc = component.iconSrc;
    expect(iconSrc).toBe('');
  });

  it('should return correct iconName', () => {
    component.iconIsFile = false;
    component.iconNameDefault = 'star-outline.svg';
    const iconName = component.iconName;
    expect(iconName).toBe('star-outline.svg');
  });

  it('should return correct iconName', () => {
    component.iconIsFile = true;
    const iconName = component.iconName;
    expect(iconName).toBe('');
  });

  it('should return iconNameSelected if isSelected is true and iconNameSelected is set', () => {
    component.isSelected = true;
    component.iconNameSelected = 'selected-icon.svg';
  
    const iconName = component['getIconName']();
  
    expect(iconName).toBe('selected-icon.svg');
  });
  
  it('should set iconIsFile to true if iconNameSelected includes .svg and isSelected is true', () => {
    component.iconNameSelected = 'selected-icon.svg';
    component.isSelected = true;
    component.item = { id: '123' } as AddressInfo;
  
    component.ngOnInit();
  
    expect(component.iconIsFile).toBe(true);
  });
});