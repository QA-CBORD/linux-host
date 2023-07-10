import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { ToastService } from '@core/service/toast/toast.service';
import { MerchantInfo, MerchantService } from '@sections/ordering';
import { LockDownService } from '@shared/services';
import { of } from 'rxjs';
import { OrderTileComponent } from './order-tile.component';

const environmentFacadeService = {
  getImageURL: jest.fn()
};
const merchantService = {
  getMerchantsWithFavoriteInfo: jest.fn(() => of([])),
};
const router = {
  navigate: jest.fn()
};
const toastService = {
  showError: jest.fn()
};
const lockDownService = {
  isLockDownOn: jest.fn()
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
