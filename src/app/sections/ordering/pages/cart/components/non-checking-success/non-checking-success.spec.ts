import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ModifyPrepTimeModule } from '@sections/ordering/shared/pipes/modify-prep-time';
import { PriceUnitsResolverModule } from '@sections/ordering/shared/pipes/price-units-resolver/price-units-resolver.module';
import { TypeMessageModule } from '@sections/ordering/shared/pipes/type-message/type-message.pipe.module';
import { OrderDetailsModule } from '@sections/ordering/shared/ui-components/order-details/order-details.module';
import { APP_ROUTES } from '@sections/section.config';
import { AddressHeaderFormatPipeModule } from '@shared/pipes/address-header-format-pipe/address-header-format-pipe.module';
import { StButtonModule } from '@shared/ui-components/st-button';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';
import { StSuccesSummaryModule } from '@shared/ui-components/success-summary/st-success-summary.module';
import { of } from 'rxjs';
import { CartComponent } from '../../cart.component';
import { CartRoutingModule } from '../../cart.routing.module';
import { NonCheckingSuccessComponent } from './non-checking-success.component';

describe('NonCheckingSuccessComponent', () => {
  let component: NonCheckingSuccessComponent;
  let routerServiceMock: any;
  let orderingServiceMock: any;
  let nonCheckingServiceMock: any;

  beforeEach(
    waitForAsync(() => {
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
    })
  );

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        IonicModule,
        CartRoutingModule,
        OrderDetailsModule,
        StHeaderModule,
        PriceUnitsResolverModule,
        StButtonModule,
        TypeMessageModule,
        AddressHeaderFormatPipeModule,
        ModifyPrepTimeModule,
        StSuccesSummaryModule,
      ],
      declarations: [NonCheckingSuccessComponent, CartComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    component = new NonCheckingSuccessComponent(routerServiceMock, orderingServiceMock, nonCheckingServiceMock);
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


  it('ngAfterViewInit should focus on modal-mainTitle', () => {
    const focusSpy = jest.spyOn(document.getElementById('modal-mainTitle'), 'focus');
    component.ngAfterViewInit();
    expect(focusSpy).toHaveBeenCalled();
  });

  it('ngAfterViewChecked should focus on modal-mainTitle', () => {
    const focusSpy = jest.spyOn(document.getElementById('modal-mainTitle'), 'focus');
    component.ngAfterViewChecked();
    expect(focusSpy).toHaveBeenCalled();
  });
  
  it('ngAfterContentChecked should focus on modal-mainTitle', () => {
    const focusSpy = jest.spyOn(document.getElementById('modal-mainTitle'), 'focus');
    component.ngAfterContentChecked();
    expect(focusSpy).toHaveBeenCalled();
  });
});

