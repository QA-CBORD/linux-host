import { TestBed } from '@angular/core/testing';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { ModalsService } from '@core/service/modals/modals.service';
import { StorageStateService } from '@core/states/storage/storage-state.service';
import { NavigationService, UuidGeneratorService } from '@shared/services';
import { CartService, CartState, MerchantService, OrderDetailOptions } from '.';
import { OrderingApiService } from './ordering.api.service';
import { of } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AlertController } from '@ionic/angular';
import { UserInfo } from '@core/model/user';
import { APP_ROUTES } from '@sections/section.config';
import { LOCAL_ROUTING, ORDER_TYPE } from '../ordering.config';
import { OrderItem } from '../shared';
import { AddressInfo } from 'net';

describe('CartService', () => {
  let service: CartService;
  const mockAlert = {
    cssClass: 'active_cart',
    header: 'patron-ui.ordering.active_cart_alert_change_title',
    message: 'patron-ui.ordering.active_cart_alert_change_msg',
    buttons: [
      {
        text: 'patron-ui.ordering.active_cart_alert_change_cancel',
        role: 'cancel',
        cssClass: 'button__option_cancel',
        handler: expect.any(Function),
      },
      {
        text: 'patron-ui.ordering.active_cart_alert_change_proceed',
        role: 'confirm',
        cssClass: 'button__option_confirm',
        handler: expect.any(Function),
      },
    ],
  };
  const userFacadeService = {
    getUserData$: jest.fn(() => of({} as UserInfo)),
  };
  const merchantService = {};
  const apiService = {};
  const uuidGeneratorService = {};
  const institutionFacade = {};
  const modalService = {
    dismiss: jest.fn(),
  };
  const storageStateService = {
    getStateEntityByKey$: jest.fn(() => of({} as CartState)),
    deleteStateEntityByKey: jest.fn(),
    updateStateEntity: jest.fn(),
  };
  const alertControllerMock = {
    create: jest.fn().mockReturnValue({
      present: jest.fn(),
      onDidDismiss: jest.fn().mockResolvedValue({}),
      dismiss: jest.fn(),
    }),
  };

  const translateServiceMock = {
    instant: jest.fn((key: string) => key),
  };
  let menuItems$: any;
  let merchant$: any;
  let routingServiceMock: any;
  let orderDetailsOptions$;
  let orderSchedule = {
    menuSchedule: [],
    days: [
      {
        date: '2024-05-08',
        dayOfWeek: 4,
        hourBlocks: [
          {
            timestamps: [],
            hour: 12,
            minuteBlocks: [0, 15, 30, 45],
          },
        ],
      },
    ],
  };
  beforeEach(() => {
    menuItems$ = of(0);
    merchant$ = of({ id: 'defaultMerchantId' });
    (orderDetailsOptions$ = of({
      orderType: ORDER_TYPE.PICKUP,
      address: {} as AddressInfo,
      dueTime: new Date(),
      isASAP: true,
    } as unknown as OrderDetailOptions)),
      (routingServiceMock = {
        navigate: jest.fn(),
      });

    TestBed.configureTestingModule({
      providers: [
        CartService,
        {
          provide: UserFacadeService,
          useValue: userFacadeService,
        },
        { provide: MerchantService, useValue: merchantService },
        { provide: OrderingApiService, useValue: apiService },
        { provide: UuidGeneratorService, useValue: uuidGeneratorService },
        { provide: InstitutionFacadeService, useValue: institutionFacade },
        { provide: ModalsService, useValue: modalService },
        { provide: StorageStateService, useValue: storageStateService },
        { provide: TranslateService, useValue: translateServiceMock },
        { provide: AlertController, useValue: alertControllerMock },
        { provide: NavigationService, useValue: routingServiceMock },
      ],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CartService);
    service['cart'].orderDetailsOptions = {
      orderType: ORDER_TYPE.PICKUP,
      address: {} as AddressInfo,
      dueTime: new Date(),
      isASAP: true,
    };
  });

  it('can load service', () => {
    expect(service).toBeTruthy();
  });

  it('should subscribe to  storage service', () => {
    const spy = jest.spyOn(storageStateService, 'getStateEntityByKey$');
    expect(service).toBeTruthy();
    expect(spy).toHaveBeenCalled();
  });

  it('should return true when isWithinLastSevenDays is passed a timestamp within the last seven days', () => {
    const timestamp = Date.now() - 1000 * 60 * 60 * 24 * 6; // 6 days ago

    const result = service['isWithinLastSevenDays'](timestamp);

    expect(result).toBe(true);
  });

  it('should return false when isWithinLastSevenDays is passed a timestamp more than seven days ago', () => {
    const timestamp = Date.now() - 1000 * 60 * 60 * 24 * 8; // 8 days ago

    const result = service['isWithinLastSevenDays'](timestamp);

    expect(result).toBe(false);
  });

  it('should call clearCart and deleteStateEntityByKey with CARTIDKEY when clearState is called', () => {
    const clearCartSpy = jest.spyOn(service, 'clearCart');
    const deleteStateEntityByKeySpy = jest.spyOn(storageStateService, 'deleteStateEntityByKey');

    service.clearState();

    expect(clearCartSpy).toHaveBeenCalled();
    expect(deleteStateEntityByKeySpy).toHaveBeenCalledWith(service['CARTIDKEY']);
  });

});
