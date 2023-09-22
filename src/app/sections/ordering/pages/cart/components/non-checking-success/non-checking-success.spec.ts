import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { OrderingService } from '@sections/ordering/services/ordering.service';
import { APP_ROUTES } from '@sections/section.config';
import { NavigationService } from '@shared/index';
import { of } from 'rxjs';
import { CartComponent } from '../../cart.component';
import { NonCheckingService } from '../../services/non-checking.service';
import { NonCheckingSuccessComponent } from './non-checking-success.component';

describe('NonCheckingSuccessComponent', () => {
  let component: NonCheckingSuccessComponent;
  let fixture: ComponentFixture<NonCheckingSuccessComponent>;

  let routerServiceMock: any;
  let orderingServiceMock: any;
  let nonCheckingServiceMock: any;

  beforeEach(waitForAsync(() => {
    routerServiceMock = {
      navigate: jest.fn(),
    };

    orderingServiceMock = {
      getContentStringByName: jest.fn(),
    };
    nonCheckingServiceMock = {
      summary$: jest.fn(() => {
        return of({
          tax: 1,
          discount: 1,
          checkNumber: 12345,
          total: 100,
          accountName: 'Points',
          deliveryFee: 1,
          pickupFee: 0,
          subTotal: 1,
          tip: 1,
          mealBased: true,
          orderType: {
            merchantId: 'Appetizer',
            pickup: true,
            delivery: false,
            dineIn: false,
            pickupPrepTime: 30,
            deliveryPrepTime: 45,
            dineInPrepTime: 30,
            pickupInstructions: '',
            deliveryInstructions: '',
            dineInInstructions: '',
            merchantTimeZone: '',
          },
          dueTime: '11:45 DST',
          type: 0,
          orderDetailOptions: {
            address: {
              address1: 'Winton AV',
            },
            dueTime: new Date(),
            orderType: 0,
            isASAP: false,
          },
        });
      }),
    };
  }));

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        { provide: NavigationService, useValue: routerServiceMock },
        { provide: OrderingService, useValue: orderingServiceMock },
        { provide: NonCheckingService, useValue: nonCheckingServiceMock },
      ],
      declarations: [NonCheckingSuccessComponent, CartComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    fixture = TestBed.createComponent(NonCheckingSuccessComponent);
    component = fixture.componentInstance;
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should call initContentStrings OnInit', () => {
    const initContentStringsSpy = jest.spyOn(component, 'initContentStrings' as any);
    component.ngOnInit();

    expect(initContentStringsSpy).toBeCalled();
  });

  it('should have summary$ object defined', () => {
    expect(component.summary$).toBeDefined();
  });

  it('should navigate to ordering page', () => {
    const onCloseSpy = jest.spyOn(component, 'onClosed');
    component.onClosed();

    expect(onCloseSpy).toBeCalled();
    expect(routerServiceMock.navigate).toBeCalledWith([APP_ROUTES.ordering]);
  });
});
