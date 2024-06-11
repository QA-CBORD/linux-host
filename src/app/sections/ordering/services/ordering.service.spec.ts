import { TestBed } from '@angular/core/testing';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { LOCAL_ROUTING, ORDERING_CONTENT_STRINGS, ORDER_TYPE } from '@sections/ordering/ordering.config';
import { IGNORE_ERRORS, OrderingService } from './ordering.service';
import { of, throwError } from 'rxjs';
import { APP_ROUTES } from '@sections/section.config';
import { AddressInfo } from 'net';
import { CartService, OrderDetailOptions } from '.';
import { NavigationService } from '@shared/services';
import { ToastService } from '@core/service/toast/toast.service';
import { BUTTON_TYPE } from '@core/utils/buttons.config';
import { AlertController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Schedule } from '../shared/ui-components/order-options.action-sheet/order-options.action-sheet.component';

describe('OrderingService', () => {
  let service: OrderingService;
  const cartService = {
    menuItems$: of([]),
    clearActiveOrder: jest.fn(),
    setActiveMerchantsMenuByOrderOptions: jest.fn(),
    orderDetailsOptions$: of({
      orderType: ORDER_TYPE.PICKUP,
      address: {} as AddressInfo,
      dueTime: new Date(),
      isASAP: true,
    } as unknown as OrderDetailOptions),
    isExistingOrder: true,
    orderItems$: of([{ id: 1, name: 'Test item' }]),
    validateOrder: jest.fn(),
    cartsErrorMessage: null,
    orderSchedule$: of({}),
    updateMerchantSettings:jest.fn()
  };

  const routingService = {
    navigate: jest.fn(),
  };

  let toastService = {
    showToast: jest.fn(),
  };
  const modalSpy = {
    onDidDismiss: jest.fn(() => Promise.resolve({ role: BUTTON_TYPE.CONTINUE })),
    present: jest.fn(),
    addEventListener: jest.fn(),
    onWillDismiss: jest.fn(() => Promise.resolve({ role: BUTTON_TYPE.CONTINUE })),
  };
  const modalControllerMock = {
    getTop: jest.fn(),
    dismiss: jest.fn(),
    create: jest.fn(() => Promise.resolve(modalSpy)),
  };

  const translateService = {
    instant: jest.fn(),
  };
  const alertControllerStub = {
    create: jest.fn().mockResolvedValue({ present: jest.fn(), onDidDismiss: jest.fn().mockResolvedValue(true) }),
    dismiss: jest.fn(),
  };

  beforeEach(() => {
    const contentStringsFacadeServiceStub = () => ({
      getContentString$: (patronUi, ordering, name) => ({ pipe: () => ({}) }),
      resolveContentString$: (get_common, error, name) => ({ pipe: () => ({}) }),
    });
    TestBed.configureTestingModule({
      providers: [
        OrderingService,
        {
          provide: ContentStringsFacadeService,
          useFactory: contentStringsFacadeServiceStub,
        },
        { provide: CartService, useValue: cartService },
        { provide: NavigationService, useValue: routingService },
        { provide: ToastService, useValue: toastService },
        { provide: ModalController, useValue: modalControllerMock },
        { provide: TranslateService, useValue: translateService },
        { provide: AlertController, useValue: alertControllerStub },
      ],
    });
    service = TestBed.inject(OrderingService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('getContentStringByName', () => {
    it('makes expected calls', () => {
      const contentStringsFacadeServiceStub: ContentStringsFacadeService = TestBed.inject(ContentStringsFacadeService);
      const oRDERING_CONTENT_STRINGSStub: ORDERING_CONTENT_STRINGS = <any>{};
      jest.spyOn(contentStringsFacadeServiceStub, 'getContentString$');
      service.getContentStringByName(oRDERING_CONTENT_STRINGSStub);
      expect(contentStringsFacadeServiceStub.getContentString$).toHaveBeenCalled();
    });
  });

  describe('getContentErrorStringByName', () => {
    it('makes expected calls', () => {
      const contentStringsFacadeServiceStub: ContentStringsFacadeService = TestBed.inject(ContentStringsFacadeService);
      const oRDERING_CONTENT_STRINGSStub: ORDERING_CONTENT_STRINGS = <any>{};
      jest.spyOn(contentStringsFacadeServiceStub, 'resolveContentString$');
      service.getContentErrorStringByName(oRDERING_CONTENT_STRINGSStub);
      expect(contentStringsFacadeServiceStub.resolveContentString$).toHaveBeenCalled();
    });
  });

  describe('getContentErrorStringByException', () => {
    it('returns the content error string if the error message includes "CONTENT_STRING"', async () => {
      const errorMessage = 'Some error message CONTENT_STRING:ERROR_MESSAGE_KEY';
      const defaultMessage = 'Default error message';
      const expectedContentString = 'Content error message';

      const getContentErrorStringByNameSpy = jest
        .spyOn(service, 'getContentErrorStringByName')
        .mockReturnValue(of(expectedContentString));

      const result = await service.getContentErrorStringByException(errorMessage, defaultMessage);

      expect(getContentErrorStringByNameSpy).toHaveBeenCalledWith('ERROR_MESSAGE_KEY');
      expect(result).toEqual(expectedContentString);
    });

    it('returns the message if the error message does not include "CONTENT_STRING"', async () => {
      const errorMessage = 'Some error message';
      const defaultMessage = 'Default error message';

      const result = await service.getContentErrorStringByException(errorMessage, defaultMessage);

      expect(result).toEqual(errorMessage);
    });
  });

  it('should call navigate when redirectToCart is called and validateOrder is successful', async () => {
    const mockIsExistingOrder = true;

    const navigateSpy = jest.spyOn(routingService, 'navigate');

    cartService.cartsErrorMessage = null;
    cartService.isExistingOrder = mockIsExistingOrder;

    service.validateOrder = jest.fn().mockImplementation((successCb, errorCb) => {
      successCb();
      return Promise.resolve();
    });

    await service['redirectToCart']();

    expect(navigateSpy).toHaveBeenCalledWith([APP_ROUTES.ordering, LOCAL_ROUTING.cart], {
      queryParams: { isExistingOrder: mockIsExistingOrder },
    });
  });

  it('should call failedValidateOrder when redirectToCart is called and validateOrder is unsuccessful', async () => {
    const mockError = 'mock error';

    const failedValidateOrderSpy = jest.spyOn(service as any, 'failedValidateOrder');

    cartService.cartsErrorMessage = null;

    service['validateOrder'] = jest.fn().mockImplementation((successCb, errorCb) => {
      errorCb(mockError);
      return Promise.resolve();
    });

    await service['redirectToCart']();

    expect(failedValidateOrderSpy).toHaveBeenCalledWith(mockError);
  });

  it('should call presentPopup when redirectToCart is called, validateOrder is unsuccessful, and error code is in IGNORE_ERRORS', async () => {
    const mockErrorCode = 'mock error code';
    const mockErrorMessage = 'mock error message';
    const mockError = [mockErrorCode, mockErrorMessage];

    IGNORE_ERRORS.push(mockErrorCode);

    const presentPopupSpy = jest.spyOn(service as any, 'presentPopup');

    cartService.cartsErrorMessage = null;

    service['validateOrder'] = jest.fn().mockImplementation((successCb, errorCb) => {
      errorCb(mockError);
      return Promise.resolve();
    });

    await service['redirectToCart']();

    expect(presentPopupSpy).toHaveBeenCalledWith(mockErrorMessage);
  });

  it('should call showToast with the correct message when failedValidateOrder is called', async () => {
    const mockMessage = 'Test message';
    const showToastSpy = jest.spyOn(toastService, 'showToast').mockReturnValue(Promise.resolve());
    await service['failedValidateOrder'](mockMessage);
    expect(showToastSpy).toHaveBeenCalledWith({ message: mockMessage });
  });
});
