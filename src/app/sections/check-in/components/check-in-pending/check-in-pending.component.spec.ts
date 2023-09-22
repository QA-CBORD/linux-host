import { ChangeDetectorRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { CoordsService } from '@core/service/coords/coords.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { AlertController, ModalController, Platform, PopoverController } from '@ionic/angular';
import { CheckingServiceFacade } from '@sections/check-in/services/check-in-facade.service';
import { RecentOrdersResolver } from '@sections/ordering/resolvers/recent-orders.resolver';
import { CartService, MerchantService } from '@sections/ordering/services';
import { LockDownService } from '@shared/services';
import { CheckInPendingComponent } from './check-in-pending.component';
import { of } from 'rxjs';
import { AccessibilityService } from '@shared/accessibility/services/accessibility.service';

describe('CheckInPendingComponent', () => {
  let component: CheckInPendingComponent;
  let fixture: ComponentFixture<CheckInPendingComponent>;

  let loadingService,
    checkInService,
    modalController,
    alertCtrl,
    popoverCtrl,
    router,
    merchantService,
    activatedRoute,
    resolver,
    coordsService,
    cdRef,
    platform,
    cartService,
    lockDownService,
    accesibilityService;

  beforeEach(() => {
    loadingService = {
      showLoading: jest.fn(),
    };
    checkInService = {
      checkInOrderByBarcode: jest.fn(),
    };
    modalController = {
      create: jest.fn(),
    };
    alertCtrl = {
      create: jest.fn(),
    };
    popoverCtrl = {
      create: jest.fn(),
    };
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
          path: '/dashboard',
        },
      },
    };
    resolver = {
      resolver: jest.fn(),
    };
    coordsService = {
      location$: of(null),
    };
    cdRef = {
      detectChanges: jest.fn(),
    };
    platform = {
      backButton: {
        subscribeWithPriority: jest.fn(),
      },
    };
    cartService = {
      getCart: jest.fn(),
    };
    lockDownService = {
      isLockDownOn: jest.fn(),
    };

    accesibilityService = {
      focusElementById: jest.fn()
    };

    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [CheckInPendingComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: MerchantService, useValue: merchantService },
        { provide: CheckingServiceFacade, useValue: checkInService },
        { provide: ModalController, useValue: modalController },
        { provide: PopoverController, useValue: popoverCtrl },
        { provide: RecentOrdersResolver, useValue: resolver },
        { provide: CoordsService, useValue: coordsService },
        { provide: CartService, useValue: cartService },
        { provide: LockDownService, useValue: lockDownService },
        { provide: Router, useValue: router },
        { provide: LoadingService, useValue: loadingService },
        { provide: AlertController, useValue: alertCtrl },
        { provide: ChangeDetectorRef, useValue: cdRef },
        { provide: Platform, useValue: platform },
        { provide: AccessibilityService, useValue: accesibilityService}
      ],
    });
    fixture = TestBed.createComponent(CheckInPendingComponent);
    component = fixture.componentInstance;
  });

  it('should create a recent order component', () => {
    expect(component).toBeTruthy();
  });

  it('should not have addded any item to the cart if lockDown flag is on', () => {
    const spy = jest.spyOn(lockDownService, 'isLockDownOn').mockReturnValue(true);
    component.data = {
      orderType: 1,
      pickupTime: { dueTime: 1 },
      storeAddress: {},
      merchant: 1,
      isASAP: true,
    } as any;
    component.onAddItems();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('ngAfterViewInit should focus on modal-mainTitle', () => {
    const focusSpy = jest.spyOn(accesibilityService, 'focusElementById');
    component.ngAfterViewInit();
    expect(focusSpy).toHaveBeenCalled();
  });
});
