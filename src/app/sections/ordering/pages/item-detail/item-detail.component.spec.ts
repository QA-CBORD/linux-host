import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectorRef, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  ItemDetailComponent,
  RoutesData,
  validateMaxLengthOfArray,
  validateMinLengthOfArray,
} from './item-detail.component';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { ToastService } from '@core/service/toast/toast.service';
import { PopoverController } from '@ionic/angular';
import { OrderingService } from '@sections/ordering/services/ordering.service';
import { NavigationService } from '@shared/services/navigation.service';
import { PriceUnitsResolverModule } from '@sections/ordering/shared/pipes/price-units-resolver/price-units-resolver.module';
import { PriceUnitsResolverPipe } from '@sections/ordering/shared/pipes/price-units-resolver/price-units-resolver.pipe';
import { of } from 'rxjs';
import { CartService } from '@sections/ordering/services';
import { ItemDetailModalComponent } from './components/item-detail-modal/item-detail-modal.component';
import { LOCAL_ROUTING } from '@sections/ordering/ordering.config';
import { APP_ROUTES } from '@sections/section.config';
import { MenuGroupInfo, MenuItemInfo, MenuItemOptionInfo, OrderItem } from '@sections/ordering/components';
import { TranslateService } from '@ngx-translate/core';
// Mock Pipe decorator
let menuItem: MenuItemInfo = {
  id: '12',
  merchantId: '',
  externalSystemRef: '',
  name: '',
  description: '',
  minimumPrice: 0,
  price: 0,
  externalSystemFields: '',
  taxMask: 0,
  visible: false,
  active: false,
  deleted: false,
  calories: 0,
  reportingCategory: '',
  carbs: 0,
  protein: 0,
  imageReference: '',
  menuItemOptions: [
    {
      menuGroup: {
        merchantId: '',
        name: 'option1',
        description: '',
        minimum: 1,
        maximum: 1,
        externalSystemRef: '',
        priceOverride: 0,
        visible: false,
        active: false,
        menuGroupItems: [],
      },
      menuItemId: '1',
      displayRank: 0,
      visible: false,
      active: false,
    },
    {
      menuGroup: {
        merchantId: '',
        name: 'option2',
        description: '',
        minimum: 1,
        maximum: 2,
        externalSystemRef: '',
        priceOverride: 0,
        visible: false,
        active: false,
        menuGroupItems: [],
      },
      menuItemId: '2',
      displayRank: 0,
      visible: false,
      active: false,
    },
  ],
};

const environmentFacadeServiceMock = {
  getImageURL: jest.fn(() => 'mockedImageURL'),
};

const loadingServiceMock = {
  showSpinner: jest.fn(),
  closeSpinner: jest.fn(),
};

const toastServiceMock = {
  showToast: jest.fn(),
  showSuccessToast: jest.fn(),
};

const navigationServiceMock = {
  navigate: jest.fn(),
};

const orderingServiceMock = {
  getContentStringByName: jest.fn(() => of('')),
};

const changeDetectorRefMock = {
  detectChanges: jest.fn(),
};

const formBuilderMock = {
  group: jest.fn(() => ({
    valueChanges: of({}),
    get: jest.fn(() => ({
      value: {},
      setValidators: jest.fn(),
    })),
    invalid: false,
  })),
};

const activatedRouteMock = {
  data: of({
    menuItem: {
      menuItem: { id: '1', name: 'Test Item', price: 10 },
      queryParams: { orderItemId: 'mockOrderItemId' },
    },
  }),
};

const cartServiceMock = {
  menuInfo$: of({}),
  orderItems$: of([]),
  merchant$: of({ settings: { map: { disableItemNotes: 'disableItemNotes' } } }),
  validateOrder: jest.fn(() => of(null)),
  addOrderItems: jest.fn(),
  removeOrderItemFromOrderById: jest.fn(),
  cartsErrorMessage: null,
  menuItems$: of(5),
  orderInfo$: of({ checkNumber: 123 }),
};

const popoverControllerMock = {
  create: jest.fn().mockResolvedValue({
    onDidDismiss: jest.fn().mockResolvedValue(true),
    present: jest.fn().mockResolvedValue(true),
  }),
};
let translateService = {
  instant: jest.fn(),
};

describe('ItemDetailComponent', () => {
  let component: ItemDetailComponent;
  let fixture: ComponentFixture<ItemDetailComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ItemDetailComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [FormsModule, ReactiveFormsModule, PriceUnitsResolverModule],
      providers: [
        { provide: EnvironmentFacadeService, useValue: environmentFacadeServiceMock },
        { provide: FormBuilder, useValue: formBuilderMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: CartService, useValue: cartServiceMock },
        { provide: LoadingService, useValue: loadingServiceMock },
        { provide: ToastService, useValue: toastServiceMock },
        { provide: OrderingService, useValue: orderingServiceMock },
        { provide: PopoverController, useValue: popoverControllerMock },
        { provide: NavigationService, useValue: navigationServiceMock },
        { provide: ChangeDetectorRef, useValue: changeDetectorRefMock },
        { provide: TranslateService, useValue: translateService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemDetailComponent);
    component = fixture.componentInstance;
    component.itemOrderForm = new FormGroup({
      option1: new FormControl(''),
    });
    component.order = { counter: 1, totalPrice: 0, optionsPrice: 0 };
    fixture.detectChanges();
  });

  it('should exist', () => {
    expect(component).toBeTruthy();
  });
  it('should call popoverController.create with correct parameters', async () => {
    const message = 'Test Message';
    const cb = jest.fn();
    await component['initInfoModal'](message, cb);
    expect(popoverControllerMock.create).toHaveBeenCalledWith({
      cssClass: 'sc-popover',
      component: ItemDetailModalComponent,
      componentProps: { message },
    });
  });

  it('should call modal.present', async () => {
    const message = 'Test Message';
    const cb = jest.fn();
    await component['initInfoModal'](message, cb);
    const modal = await popoverControllerMock.create.mock.results[0].value;
    expect(modal.present).toHaveBeenCalled();
  });

  it('should navigate to full menu with correct query params', () => {
    component.navigateToFullMenu();
    expect(navigationServiceMock.navigate).toHaveBeenCalledWith([APP_ROUTES.ordering, LOCAL_ROUTING.fullMenu], {
      queryParams: { openTimeSlot: true },
    });
  });
  it('should navigate to full menu if isScannedItem is true', () => {
    component.routesData = {
      menuItem,
      queryParams: { isScannedItem: true } as any,
    };
    component.onClose();
    expect(navigationServiceMock.navigate).toHaveBeenCalledWith([APP_ROUTES.ordering, LOCAL_ROUTING.fullMenu]);
  });

  it('should navigate to menu category items with categoryId if isScannedItem is false', () => {
    const categoryId = 'mockCategoryId';
    component.routesData = {
      menuItem,
      queryParams: { isScannedItem: false, categoryId } as any,
    };
    component.onClose();
    expect(navigationServiceMock.navigate).toHaveBeenCalledWith([
      APP_ROUTES.ordering,
      LOCAL_ROUTING.menuCategoryItems,
      categoryId,
    ]);
  });
  it('should return true if minimum and maximum are not set', () => {
    const result = component.isErrorMultiList({
      menuGroup: { minimum: undefined, maximum: undefined, name: 'option1' },
    });
    expect(result).toBe(true);
  });

  it('should return true if only maximum is set and value length is less than or equal to maximum', () => {
    component.itemOrderForm.get('option1').setValue('test');
    const result = component.isErrorMultiList({ menuGroup: { minimum: undefined, maximum: 5, name: 'option1' } });
    expect(result).toBe(true);
  });

  it('should return true if only minimum is set and value length is greater than or equal to minimum', () => {
    component.itemOrderForm.get('option1').setValue('test');
    const result = component.isErrorMultiList({ menuGroup: { minimum: 3, maximum: undefined, name: 'option1' } });
    expect(result).toBe(true);
  });

  it('should return true if both minimum and maximum are set and value length is equal to minimum', () => {
    component.itemOrderForm.get('option1').setValue('test');
    const result = component.isErrorMultiList({ menuGroup: { minimum: 4, maximum: 4, name: 'option1' } });
    expect(result).toBe(true);
  });
  it('should decrement counter and recalculate total price when removing items', () => {
    component.removeItems();
    expect(component.order.counter).toBe(1); // Assuming initial counter is 1
    // Assuming calculateTotalPrice() updates the total price
  });

  it('should increment counter and recalculate total price when adding items', () => {
    component.addItems();
    expect(component.order.counter).toBe(2); // Assuming initial counter is 1
    // Assuming calculateTotalPrice() updates the total price
  });

  it('should configure menu item correctly', () => {
    const menuItemId = 'menuItemId';
    const quantity = 2;

    const configuredMenuItem = component['configureMenuItem'](menuItemId, quantity);

    expect(configuredMenuItem).toEqual({
      menuItemId: 'menuItemId',
      orderItemOptions: [],
      quantity: 2,
    });
  });
  it('should call showAddedItemsQuantity with correct value', () => {
    const mockItems = 5;

    const showAddedItemsQuantitySpy = jest.spyOn(component, 'showAddedItemsQuantity');

    component['addNewItem']();

    expect(showAddedItemsQuantitySpy).toHaveBeenCalledWith(mockItems);
  });
  it('should call showToast with correct message', async () => {
    const errorMessage = 'Validation failed';
    await component['failedValidateOrder'](errorMessage);
    expect(toastServiceMock.showToast).toHaveBeenCalledWith({
      message: errorMessage,
      icon: 'warning',
      cssClass: 'toast-message-warning',
    });
  });

  describe('Validators', () => {
    describe('validateMinLengthOfArray', () => {
      it('should return null if the control value length is greater than or equal to the specified minimum', () => {
        const control = new FormControl(['a', 'b', 'c']);
        const minLengthValidator = validateMinLengthOfArray(3) as any;

        const result = minLengthValidator(control);

        expect(result).toBeNull();
      });

      it('should return minLength error if the control value length is less than the specified minimum', () => {
        const control = new FormControl(['a', 'b']);
        const minLengthValidator = validateMinLengthOfArray(3) as any;

        const result = minLengthValidator(control);

        expect(result).toEqual({ minLength: { valid: false } });
      });
    });

    describe('validateMaxLengthOfArray', () => {
      it('should return null if the control value length is less than or equal to the specified maximum', () => {
        const control = new FormControl(['a', 'b', 'c']);
        const maxLengthValidator = validateMaxLengthOfArray(3) as any;

        const result = maxLengthValidator(control);

        expect(result).toBeNull();
      });

      it('should return maxLength error if the control value length is greater than the specified maximum', () => {
        const control = new FormControl(['a', 'b', 'c', 'd']);
        const maxLengthValidator = validateMaxLengthOfArray(3) as any;

        const result = maxLengthValidator(control);

        expect(result).toEqual({ maxLength: { valid: false } });
      });
    });
  });
  it('should update order optionsPrice when form value changes', () => {
    const formValue = {
      option1: [
        { id: '1', price: 10 },
        { id: '2', price: 20 },
      ],
    };

    component.itemOrderForm.setValue(formValue);

    component['valueChanges']();

    expect(component.order.optionsPrice).toBe(0);
  });

  describe('valueChanges', () => {
    it('should update order optionsPrice when form value contains array of objects', () => {
      const formValue = {
        option1: [{ price: 10 }, { price: 20 }, { price: 30 }],
        option2: [{ price: 15 }],
      };

      const itemOrderFormMock = {
        valueChanges: of(formValue),
      };

      const calculateTotalPriceMock = jest.fn();

      const sourceSubscriptionMock = {
        add: jest.fn(),
      };

      component['valueChanges'].call({
        itemOrderForm: itemOrderFormMock,
        calculateTotalPrice: calculateTotalPriceMock,
        sourceSubscription: sourceSubscriptionMock,
        order: { optionsPrice: 0 },
      });

      expect(calculateTotalPriceMock).toHaveBeenCalledTimes(1);
      expect(calculateTotalPriceMock).toHaveBeenCalledWith();
    });

    it('should update order optionsPrice when form value contains array of strings', () => {
      const formValue = {
        option1: ['string1', 'string2', 'string3'],
        option2: ['string4'],
      };

      const itemOrderFormMock = {
        valueChanges: of(formValue),
      };

      const calculateTotalPriceMock = jest.fn();

      const sourceSubscriptionMock = {
        add: jest.fn(),
      };

      component['valueChanges'].call({
        itemOrderForm: itemOrderFormMock,
        calculateTotalPrice: calculateTotalPriceMock,
        sourceSubscription: sourceSubscriptionMock,
        order: { optionsPrice: 0 },
      });

      expect(calculateTotalPriceMock).toHaveBeenCalledTimes(1);
      expect(calculateTotalPriceMock).toHaveBeenCalledWith();
    });

    it('should update order optionsPrice when form value contains array of mixed types', () => {
      const formValue = {
        option1: [{ price: 10 }, 'string1', { id: '1', price: 20 }],
        option2: ['string2', { id: '2', price: 15 }],
      };

      const itemOrderFormMock = {
        valueChanges: of(formValue),
      };

      const calculateTotalPriceMock = jest.fn();

      const sourceSubscriptionMock = {
        add: jest.fn(),
      };

      component['valueChanges'].call({
        itemOrderForm: itemOrderFormMock,
        calculateTotalPrice: calculateTotalPriceMock,
        sourceSubscription: sourceSubscriptionMock,
        order: { optionsPrice: 0 },
      });

      expect(calculateTotalPriceMock).toHaveBeenCalledTimes(1);
      expect(calculateTotalPriceMock).toHaveBeenCalledWith();
    });
  });

  it('should show success toast with correct message when multiple items are added', () => {
    component.showAddedItemsQuantity(5);
    expect(toastServiceMock.showSuccessToast).toHaveBeenCalledTimes(2);
  });

  it('should initForm correctly', () => {
    component.routesData = {
      menuItem,
      queryParams: { orderItemId: 'mockOrderItemId', isItemExistsInCart: true },
    } as RoutesData;
    component.menuItem = menuItem;
    component.cartOrderItemOptions = [
      {
        id: '1',
        name: 'Option 1',
        menuGroup: { name: 'option1', minimum: 1, maximum: 1 } as MenuGroupInfo,
      },
      {
        id: '2',
        name: 'Option 2',
        menuGroup: { name: 'option2', minimum: 1, maximum: 2 } as MenuGroupInfo,
      },
    ] as unknown as OrderItem[];

    component['initForm']();

    expect(component.itemOrderForm).toBeTruthy();
    expect(component.itemOrderForm.get('option1')).toBeTruthy();
    expect(component.itemOrderForm.get('option2')).toBeTruthy();
  });

  it('should initForm correctly when menuItemOptions are not provided', () => {
    menuItem = {
      ...menuItem,
      id: '1',
      name: 'Test Item',
      price: 10,
      menuItemOptions: [],
    };

    component.routesData = {
      menuItem,
      queryParams: { orderItemId: 'mockOrderItemId', isItemExistsInCart: true },
    } as RoutesData;
    component.menuItem = menuItem;

    component['initForm']();

    expect(component.itemOrderForm).toBeTruthy();
  });
});
