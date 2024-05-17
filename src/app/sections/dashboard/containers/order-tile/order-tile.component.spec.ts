import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { ToastService } from '@core/service/toast/toast.service';
import {
  CartService,
  MerchantInfo,
  MerchantOrderTypesInfo,
  MerchantService,
  MerchantSettingInfo,
  OrderDetailOptions,
} from '@sections/ordering';
import { LockDownService, NavigationService } from '@shared/services';
import { of } from 'rxjs';
import { OrderTileComponent } from './order-tile.component';
import { ORDER_TYPE } from '@sections/ordering/ordering.config';
import { AddressInfo } from 'net';
import { ActiveCartService } from '@sections/ordering/services/active-cart.service';

const environmentFacadeService = {
  getImageURL: jest.fn(),
};
const merchantService = {
  getMerchantsWithFavoriteInfo: jest.fn(() => of([])),
};
const router = {
  navigate: jest.fn(),
};
const toastService = {
  showError: jest.fn(),
};
const lockDownService = {
  isLockDownOn: jest.fn(),
};
const routingService = { navigate: jest.fn() };
const mockActiveCartService = {
  preValidateOrderFlow: jest.fn(),
};

const mockCartService = {
  merchant$: of({}),
  menuItems$: of(0),
  showActiveCartWarning: jest.fn(),
  orderSchedule$: of({}),
  orderDetailsOptions$: of({
    orderType: ORDER_TYPE.PICKUP,
    address: {} as AddressInfo,
    dueTime: new Date(),
    isASAP: true,
  } as unknown as OrderDetailOptions),
};

describe('OrderTileComponent', () => {
  let component: OrderTileComponent;
  let fixture: ComponentFixture<OrderTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      //TODO: Temp fix for Swiper imports, should setup JEST instead
      declarations: [OrderTileComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: EnvironmentFacadeService, useValue: environmentFacadeService },
        { provide: MerchantService, useValue: merchantService },
        { provide: Router, useValue: router },
        { provide: ToastService, useValue: toastService },
        { provide: LockDownService, useValue: lockDownService },
        { provide: NavigationService, useValue: routingService },
        { provide: CartService, useValue: mockCartService },
        { provide: ActiveCartService, useValue: mockActiveCartService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should not redirect when lockDown is on', () => {
    const routerSpy = jest.spyOn(router, 'navigate');
    const lockDownSpy = jest.spyOn(lockDownService, 'isLockDownOn').mockResolvedValue(true);
    component.goToMerchant({} as MerchantInfo);
    expect(lockDownSpy).toHaveBeenCalledTimes(1);
    expect(routerSpy).toHaveBeenCalledTimes(0);
  });
});
