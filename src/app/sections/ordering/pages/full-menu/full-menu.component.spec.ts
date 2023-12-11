import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FullMenuComponent } from './full-menu.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Storage } from '@ionic/storage';
import { OrderingService } from '@sections/ordering/services/ordering.service';
import { TranslateService } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { AlertController, ModalController, PopoverController } from '@ionic/angular';
import { CartService, MerchantService } from '@sections/ordering/services';
import { of } from 'rxjs';
import { LoadingService } from '@core/service/loading/loading.service';
import { ToastService } from '@core/service/toast/toast.service';
import { OrderActionSheetService } from '@sections/ordering/services/odering-actionsheet.service';
import { ORDER_TYPE } from '@sections/ordering/ordering.config';
import { BUTTON_TYPE } from '@core/utils/buttons.config';

describe('FullMenuComponent', () => {
  let component: FullMenuComponent;
  let fixture: ComponentFixture<FullMenuComponent>;

  const modalSpy = {
    onDidDismiss: jest.fn(() => Promise.resolve({ role: BUTTON_TYPE.CONTINUE })),
    present: jest.fn(),
  };
  
  const storage = {
    clear: jest.fn(),
    ready: jest.fn(),
    get: jest.fn(),
  };
  const orderingService = {
    getContentStringByName: jest.fn(async labelSavedAddresses => ({})),
  };
  const _translateService = {
    instant: jest.fn(),
  };
  const modalControllerMock = {
    getTop: jest.fn(),
    dismiss: jest.fn(),
  };
  const popoverControllerMock = {
    getTop: jest.fn(),
    dismiss: jest.fn(),
  };
  const cartService = {
    menuItems$: of(null),
    clearActiveOrder: jest.fn(),
    setActiveMerchantsMenuByOrderOptions: jest.fn()
  };
  const merchantService = {
    menuInfo$: of(null),
    merchant$: of(null),
  };
  let loadingService = {
    showSpinner: jest.fn(),
    closeSpinner: jest.fn()
  };
  let toastService = {
    showToast: jest.fn()
  };
  let alertController = { create: jest.fn(() => Promise.resolve(modalSpy)), present: jest.fn(() => Promise.resolve(true)) };
  let orderActionSheetService = {
    openActionSheet: jest.fn()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FullMenuComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: Storage, useValue: storage },
        { provide: OrderingService, useValue: orderingService },
        { provide: TranslateService, useValue: _translateService },
        { provide: ModalController, useValue: modalControllerMock },
        { provide: PopoverController, useValue: popoverControllerMock },
        { provide: CartService, useValue: cartService },
        { provide: MerchantService, useValue: merchantService },
        { provide: LoadingService, useValue: loadingService },
        { provide: AlertController, useValue: alertController },
        { provide: ToastService, useValue: toastService },
        { provide: OrderActionSheetService, useValue: orderActionSheetService },
      ],
      imports: [HttpClientTestingModule, RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FullMenuComponent);
    component = fixture.componentInstance;
  });

  describe('FullMenuComponent', () => {
    it('should exist', () => {
      expect(component).toBeTruthy();
    });

    it('should call setActiveMerchantsMenuByOrderOptions on cancel button click', async () => {
      const dueTime = "01-01-2023";
      const orderType = ORDER_TYPE.DELIVERY;
      const address = 'Address example';
      const isASAP = true;

      await component.modalHandler({ dueTime, orderType, address, isASAP });

      const cancelButtonHandler = (component as any).alertController.create.mock.calls[0][0].buttons[0].handler;
      cancelButtonHandler();

      expect((component as any).cartService.setActiveMerchantsMenuByOrderOptions).toHaveBeenCalledWith(
        dueTime,
        orderType,
        address,
        isASAP
      );
    });

    it('should call clearActiveOrder and setActiveMerchantsMenuByOrderOptions on confirm button click', async () => {
      const dueTime = "01-01-2023";
      const orderType = ORDER_TYPE.DELIVERY;
      const address = 'Address example';
      const isASAP = true;

      await component.modalHandler({ dueTime, orderType, address, isASAP });

      const confirmButtonHandler = (component as any).alertController.create.mock.calls[0][0].buttons[1].handler;
      confirmButtonHandler();

      expect((component as any).cartService.clearActiveOrder).toHaveBeenCalled();
      expect((component as any).cartService.setActiveMerchantsMenuByOrderOptions).toHaveBeenCalledWith(
        dueTime,
        orderType,
        address,
        isASAP
      );
    });
  });
});
