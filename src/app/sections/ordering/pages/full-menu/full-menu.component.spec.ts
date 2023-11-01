import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FullMenuComponent } from './full-menu.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Storage } from '@ionic/storage';
import { CoreTestingModules } from 'src/app/testing/core-modules';
import { OrderingService } from '@sections/ordering/services/ordering.service';
import { TranslateService } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { AlertController, ModalController, PopoverController } from '@ionic/angular';
import { CartService, MerchantService } from '@sections/ordering/services';
import { of } from 'rxjs';
import { LoadingService } from '@core/service/loading/loading.service';
import { ToastService } from '@core/service/toast/toast.service';
import { OrderActionSheetService } from '@sections/ordering/services/odering-actionsheet.service';

describe('FullMenuComponent', () => {
  let component: FullMenuComponent;
  let fixture: ComponentFixture<FullMenuComponent>;
  const storage = {
    clear: jest.fn(),
    ready: jest.fn(),
    get: jest.fn(),
  };
  const orderingService = {
    getContentStringByName: jest.fn(async labelSavedAddresses => ({})),
  };
  const _translateService = {};
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
  };
  const merchantService = {
    menuInfo$: of(null),
    merchant$: of(null),
  };
  let loadingService;
  let toastService;
  let alertController;
  let orderActionSheetService;

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

  describe('Component', () => {
    it('should exist', () => {
      expect(component).toBeTruthy();
    });
  });
});
