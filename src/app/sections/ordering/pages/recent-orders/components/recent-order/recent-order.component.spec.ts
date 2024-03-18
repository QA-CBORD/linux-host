import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { ModalsService } from '@core/service/modals/modals.service';
import { ToastService } from '@core/service/toast/toast.service';
import { AlertController, PopoverController } from '@ionic/angular';
import { CheckingServiceFacade } from '@sections/check-in/services/check-in-facade.service';
import { CheckingProcess } from '@sections/check-in/services/check-in-process-builder';
import { CartService, MerchantService } from '@sections/ordering/services';
import { OrderingService } from '@sections/ordering/services/ordering.service';
import { LockDownService } from '@shared/services';
import { RecentOrderComponent } from './recent-order.component';
import { of } from 'rxjs';
import { OrderActionSheetService } from '@sections/ordering/services/odering-actionsheet.service';

describe(RecentOrderComponent, () => {
  let component: RecentOrderComponent;
  let fixture: ComponentFixture<RecentOrderComponent>;

  let activatedRoute,
    merchantService,
    router,
    popoverController,
    modalController,
    cart,
    loadingService,
    toastService,
    userFacadeService,
    orderingService,
    checkinService,
    alertController,
    institutionService,
    checkinProcess,
    lockDownService;

  beforeEach(() => {
    activatedRoute = {
      snapshot: {
        params: {
          id: 'mockOrderId',
        },
      },
    };
    merchantService = {
      getMerchant: jest.fn().mockReturnValue(of({ id: 'mockMerchantId' })),
    };
    router = {
      navigate: jest.fn(),
    };
    popoverController = {
      create: jest.fn(),
    };
    modalController = {
      create: jest.fn(),
    };
    cart = {
      getCart: jest.fn(),
    };
    loadingService = {
      showLoading: jest.fn(),
    };
    toastService = {
      showToast: jest.fn(),
    };
    userFacadeService = {
      getUser: jest.fn(),
    };
    orderingService = {
      getOrder: jest.fn(),
    };
    checkinService = {
      getCheckinInstruction: jest.fn(),
    };
    alertController = {
      create: jest.fn(),
    };
    institutionService = {
      getInstitution: jest.fn(),
    };
    checkinProcess = {
      startCheckin: jest.fn(),
    };
    lockDownService = {
      isLockDownOn: jest.fn(),
    };

    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [RecentOrderComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: MerchantService, useValue: merchantService },
        { provide: Router, useValue: router },
        { provide: PopoverController, useValue: popoverController },
        { provide: ModalsService, useValue: modalController },
        { provide: CartService, useValue: cart },
        { provide: LoadingService, useValue: loadingService },
        { provide: ToastService, useValue: toastService },
        { provide: UserFacadeService, useValue: userFacadeService },
        { provide: OrderingService, useValue: orderingService },
        { provide: CheckingServiceFacade, useValue: checkinService },
        { provide: AlertController, useValue: alertController },
        { provide: InstitutionFacadeService, useValue: institutionService },
        { provide: CheckingProcess, useValue: checkinProcess },
        { provide: LockDownService, useValue: lockDownService },
        { provide: OrderActionSheetService, useValue: { openActionSheet$: of() } },
      ],
    });
    fixture = TestBed.createComponent(RecentOrderComponent);
    component = fixture.componentInstance;
  });

  it('should create a recent order component', () => {
    expect(component).toBeTruthy();
  });

  it('should not have addded any item to the cart if lockDown flag is on', () => {
    const spy = jest.spyOn(lockDownService, 'isLockDownOn').mockReturnValue(true);
    component.onAddItems();
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
