import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, zip } from 'rxjs';
import { first, take } from 'rxjs/operators';

import {
  LOCAL_ROUTING,
  MerchantSettings,
  ORDER_ERROR_CODES,
  ORDER_VALIDATION_ERRORS,
  ORDERING_CONTENT_STRINGS,
} from '@sections/ordering/ordering.config';
import { CartService, MenuInfo, MenuItemInfo, OrderItem } from '@sections/ordering';
import { LoadingService } from '@core/service/loading/loading.service';
import { handleServerError } from '@core/utils/general-helpers';
import { OrderingComponentContentStrings, OrderingService } from '@sections/ordering/services/ordering.service';
import { ItemDetailModalComponent } from '@sections/ordering/pages/item-detail/components/item-detail-modal/item-detail-modal.component';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { ToastService } from '@core/service/toast/toast.service';
import { NavigationService } from '@shared/services/navigation.service';
import { APP_ROUTES } from '@sections/section.config';

@Component({
  selector: 'st-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemDetailComponent implements OnInit {
  private readonly sourceSubscription: Subscription = new Subscription();
  itemOrderForm: FormGroup;
  order: { counter: number; totalPrice: number; optionsPrice: number } = { counter: 1, totalPrice: 0, optionsPrice: 0 };
  menuItem: MenuItemInfo;
  menuItemImg: string;
  menuInfo$: Observable<MenuInfo>;
  errorState: boolean = false;
  cartSelectedItem: OrderItem;
  cartOrderItemOptions: OrderItem[] = [];
  allowNotes: boolean;
  contentStrings: OrderingComponentContentStrings = <OrderingComponentContentStrings>{};
  routesData: RoutesData;

  constructor(
    private readonly environmentFacadeService: EnvironmentFacadeService,
    private readonly fb: FormBuilder,
    private readonly activatedRoute: ActivatedRoute,
    private readonly cartService: CartService,
    private readonly loadingService: LoadingService,
    private readonly toastService: ToastService,
    private readonly orderingService: OrderingService,
    private readonly popoverController: PopoverController,
    private readonly navService: NavigationService,
    private readonly cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.initContentStrings();
    this.activatedRoute.data.subscribe(({ data }) => {
      this.routesData = data;
      this.initMenuItemOptions();
      this.menuInfo$ = this.cartService.menuInfo$;
      this.calculateTotalPrice();
      this.cdRef.detectChanges();
    });
  }

  private async initInfoModal(message: string, cb: () => void): Promise<void> {
    const modal = await this.popoverController.create({
      component: ItemDetailModalComponent,
      componentProps: { message },
    });

    modal.onDidDismiss().then(cb);
    await modal.present();
  }

  ngOnDestroy() {
    this.sourceSubscription.unsubscribe();
  }

  navigateToFullMenu() {
    this.navService.navigate([APP_ROUTES.ordering, LOCAL_ROUTING.fullMenu], {
      queryParams: { openTimeSlot: true },
    });
  }

  onClose() {
    if (this.routesData.queryParams.isScannedItem) {
      this.navService.navigate([APP_ROUTES.ordering, LOCAL_ROUTING.fullMenu]);
    } else {
      const {
        queryParams: { categoryId },
      } = this.routesData;
      this.navService.navigate([APP_ROUTES.ordering, LOCAL_ROUTING.menuCategoryItems, categoryId]);
    }
  }

  initForm() {
    const cartSelectedItems = this.cartOrderItemOptions;
    const formGroup = {};
    if (!cartSelectedItems.length) {
      this.menuItem.menuItemOptions.forEach(({ menuGroup: { minimum, maximum, name } }) => {
        if (minimum === 1 && maximum === 1) {
          formGroup[name] = ['', [Validators.required]];
          return;
        }
        formGroup[name] = [[], [validateMinLengthOfArray(minimum), validateMaxLengthOfArray(maximum)]];
      });
    } else {
      this.menuItem.menuItemOptions.forEach(({ menuGroup: { minimum, maximum, menuGroupItems, name } }) => {
        if (minimum === 1 && maximum === 1) {
          let formItemValue: string | MenuItemInfo = '';
          const selectedOption = menuGroupItems.find(({ menuItem: { id } }) => {
            const selectedItem = cartSelectedItems.find(({ menuItemId }) => menuItemId === id);

            return selectedItem && id === selectedItem.menuItemId;
          });

          if (selectedOption) {
            formItemValue = selectedOption.menuItem;
          }
          formGroup[name] = [formItemValue, [Validators.required]];
        } else {
          const selectedOptions = menuGroupItems.map(({ menuItem }) => {
            const selectedItem = cartSelectedItems.find(({ menuItemId }) => menuItemId === menuItem.id);
            if (selectedItem && menuItem.id === selectedItem.menuItemId) {
              return menuItem;
            }
          });

          formGroup[name] = [
            selectedOptions.filter(item => item),
            [validateMinLengthOfArray(minimum), validateMaxLengthOfArray(maximum)],
          ];
        }
      });
    }

    this.itemOrderForm = this.fb.group({
      ...formGroup,
      message: [
        this.cartSelectedItem && this.cartSelectedItem.specialInstructions
          ? this.cartSelectedItem.specialInstructions
          : '',
        [Validators.minLength(1), Validators.maxLength(255)],
      ],
    });

    this.valueChanges();
  }

  isErrorMultiList({ menuGroup: { minimum, maximum, name } }) {
    const { value } = this.itemOrderForm.get(name);

    if (!minimum && !maximum) {
      return true;
    }
    if (!minimum && maximum) {
      return value.length <= maximum;
    }
    if (minimum && !maximum) {
      return value.length >= minimum;
    }
    if (minimum && maximum && minimum === maximum) {
      return value.length === minimum;
    }
  }

  calculateTotalPrice() {
    const calcValue = (this.menuItem.price + this.order.optionsPrice) * this.order.counter;
    this.order = { ...this.order, totalPrice: Number(calcValue.toFixed(2)) };
  }

  removeItems() {
    this.order.counter > 1 ? this.order.counter-- : null;
    this.calculateTotalPrice();
  }

  addItems() {
    this.order.counter++;
    this.calculateTotalPrice();
  }

  async onFormSubmit(): Promise<void> {
    if (this.itemOrderForm.invalid) {
      this.errorState = true;
      return;
    }
    const menuItem = this.configureMenuItem(this.menuItem.id, this.order.counter);
    const arrayOfvalues: any[] = Object.values(this.itemOrderForm.value);
    arrayOfvalues.forEach(value => {
      if (!value) {
        return;
      }

      if (typeof value === 'string') {
        menuItem.specialInstructions = value;
        return;
      }

      if (value.length) {
        value.forEach(elem => {
          menuItem.orderItemOptions.push(this.configureMenuItem(elem.id, 1) as OrderItem);
        });
        return;
      }

      if (value && value.id) {
        menuItem.orderItemOptions.push(this.configureMenuItem(value.id, 1) as OrderItem);
        return;
      }
    });

    await this.onSubmit(menuItem);
  }

  private configureMenuItem(menuItemId: string, quantity: number): Partial<OrderItem> {
    return { menuItemId, orderItemOptions: [], quantity };
  }

  private async onSubmit(menuItem): Promise<void> {
    const {
      queryParams: { orderItemId },
    } = this.routesData;
    const orderItems = await this.cartService.orderItems$.pipe(first()).toPromise();
    if (orderItems.length && orderItemId) {
      await this.cartService.removeOrderItemFromOrderById(orderItemId);
    }

    this.cartService.addOrderItems(menuItem);
    await this.loadingService.showSpinner();
    await this.cartService
      .validateOrder()
      .pipe(
        first(),
        handleServerError(ORDER_VALIDATION_ERRORS)
      )
      .toPromise()
      .then(() => {
        this.cartService.cartsErrorMessage = null;
        this.onClose();
      })
      .catch(async error => {
        // Temporary solution:

        if (Array.isArray(error)) {
          const [code, text] = error;
          if (+code === +ORDER_ERROR_CODES.ORDER_CAPACITY) {
            await this.initInfoModal(text, this.navigateToFullMenu.bind(this));
            return;
          } else {
            this.cartService.cartsErrorMessage = text;
            this.onClose();
            return;
          }
        }
        this.cartService.removeLastOrderItem();
        this.failedValidateOrder(error);
      })
      .finally(() => this.loadingService.closeSpinner());
  }

  private async failedValidateOrder(message: string) {
    await this.toastService.showToast({ message });
  }

  private initMenuItemOptions() {
    zip(this.activatedRoute.data, this.cartService.orderItems$, this.cartService.merchant$)
      .pipe(take(1))
      .subscribe(([{ data: { menuItem, queryParams: { orderItemId } } }, orderItems, { settings }]) => {
        const imageBaseUrl = this.environmentFacadeService.getImageURL();
        this.menuItem = menuItem.menuItem;
        this.menuItemImg = this.menuItem.imageReference ? `${imageBaseUrl}${this.menuItem.imageReference}` : '';
        this.order = { ...this.order, totalPrice: this.menuItem.price };
        this.allowNotes = !JSON.parse(settings.map[MerchantSettings.disableItemNotes].value);

        this.cartSelectedItem = orderItems.find(({ id }) => id === orderItemId);
        if (this.cartSelectedItem) {
          this.cartOrderItemOptions = this.cartSelectedItem.orderItemOptions;
          const optionsPrice = this.cartOrderItemOptions.reduce(
            (total, item) => (!item ? total : item.salePrice + total),
            0
          );

          this.order = { ...this.order, counter: this.cartSelectedItem.quantity, optionsPrice };
        }
        this.initForm();
      });
  }

  private valueChanges() {
    const subscription = this.itemOrderForm.valueChanges.subscribe(formValue => {
      const arrayValues: any[] = Object.values(formValue);
      this.order = { ...this.order, optionsPrice: 0 };
      arrayValues.map(value => {
        if (!value || typeof value === 'string') {
          return;
        }

        if (value.length) {
          const optionPrice = value.reduce((total, item) => (!item ? total : item.price + total), 0);
          this.order = { ...this.order, optionsPrice: this.order.optionsPrice + optionPrice };
          return;
        }

        if (value && value.id) {
          this.order = { ...this.order, optionsPrice: this.order.optionsPrice + value.price };
          return;
        }
      });

      this.calculateTotalPrice();
    });

    this.sourceSubscription.add(subscription);
  }

  private initContentStrings() {
    this.contentStrings.buttonAdd = this.orderingService.getContentStringByName(ORDERING_CONTENT_STRINGS.buttonAdd);
    this.contentStrings.buttonUpdate = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.buttonUpdate
    );
    this.contentStrings.labelItemNote = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.labelItemNote
    );
  }
}

export const validateMinLengthOfArray = (min: number | undefined): ValidationErrors | null => {
  return (c: AbstractControl): { [key: string]: any } => {
    if (!min || c.value.length >= min) return null;

    return { minLength: { valid: false } };
  };
};

export const validateMaxLengthOfArray = (max: number | undefined): ValidationErrors | null => {
  return (c: AbstractControl): { [key: string]: any } => {
    if (!max || c.value.length <= max) return null;

    return { maxLength: { valid: false } };
  };
};

export interface RoutesData {
  menuItem: MenuItemInfo;
  queryParams: {
    categoryId: string;
    menuItemId: string;
    orderItemId: string;
    isItemExistsInCart: boolean;
    isScannedItem: boolean;
  };
}
