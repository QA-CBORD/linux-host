import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MerchantInfo } from '@sections/ordering/shared/models';
import { MerchantListComponent } from './merchant-list.component';

describe('MerchantListComponent', () => {
  let component: MerchantListComponent;
  let fixture: ComponentFixture<MerchantListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [MerchantListComponent]
    });
    fixture = TestBed.createComponent(MerchantListComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it('should emit merchantClick event when merchantClickHandler is called', () => {
    const merchantInfo = { id: '1', name: 'Test Merchant' }; 
    jest.spyOn(component.merchantClick, 'emit');

    component.merchantClickHandler(merchantInfo);

    expect(component.merchantClick.emit).toHaveBeenCalledWith(merchantInfo);
  });

  it('should emit addToFav event when favouriteHandler is called', () => {
    const favInfo = { isFavorite: true, id: '1' };
    jest.spyOn(component.addToFav, 'emit');

    component.favouriteHandler(favInfo);

    expect(component.addToFav.emit).toHaveBeenCalledWith(favInfo);
  });

  it('should emit locationPin event when locationPinHandler is called', () => {
    const id = '1';
    jest.spyOn(component.locationPin, 'emit');

    component.locationPinHandler(id);

    expect(component.locationPin.emit).toHaveBeenCalledWith(id);
  });
});
