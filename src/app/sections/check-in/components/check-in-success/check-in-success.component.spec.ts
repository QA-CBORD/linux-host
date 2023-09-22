import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RecentOrdersResolver } from '@sections/ordering/resolvers/recent-orders.resolver';
import { MerchantService } from '@sections/ordering/services';
import { of } from 'rxjs';
import { CheckInSuccessComponent } from './check-in-success.component';
import { HttpClientModule } from '@angular/common/http';
import { StorageStateService } from '@core/states/storage/storage-state.service';
import { AccessibilityService } from '@shared/accessibility/services/accessibility.service';

describe('CheckInSuccessComponent', () => {
  let component: CheckInSuccessComponent;
  let fixture: ComponentFixture<CheckInSuccessComponent>;

  let router, merchantService, resolver, activatedRoute, storage, storageStateService, accesibilityService;

  beforeEach(() => {
    router = {
      navigate: jest.fn(),
    };
    merchantService = {
      recentOrders$: of(null),
    };
    activatedRoute = {
      data: of({} as any),
      snapshot: {
        queryParams: {
          contentString: 'hello',
        },
      },
    };
    storage = {
      clear: jest.fn(),
      ready: jest.fn(),
      get: jest.fn(),
    };
    resolver = {
      resolver: jest.fn(),
    };
    storageStateService = {};
    accesibilityService = {
      focusElementById: jest.fn()
    };

    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [CheckInSuccessComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: MerchantService, useValue: merchantService },
        { provide: RecentOrdersResolver, useValue: resolver },
        { provide: Router, useValue: router },
        { provide: Storage, useValue: storage },
        { provide: StorageStateService, useValue: storageStateService },
        { provide: AccessibilityService, useValue: accesibilityService}
      ],
      imports: [HttpClientModule],
    });
    fixture = TestBed.createComponent(CheckInSuccessComponent);
    component = fixture.componentInstance;
  });

  it('should create a recent order component', () => {
    expect(component).toBeTruthy();
  });


  it('ngAfterViewInit should focus on modal-mainTitle', () => {
    const focusSpy = jest.spyOn(accesibilityService, 'focusElementById');
    component.ngAfterViewInit();
    expect(focusSpy).toHaveBeenCalled();
  });
});
