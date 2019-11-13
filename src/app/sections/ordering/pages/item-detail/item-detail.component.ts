import { LOCAL_ROUTING } from '@sections/ordering/ordering.config';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NAVIGATE } from 'src/app/app.global';
import { zip, Subscription } from 'rxjs';
import { CartService, MenuItemInfo, OrderItem } from '@sections/ordering';
import { take } from 'rxjs/operators';

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
  isStaticHeader: boolean = true;
  errorState: boolean = false;

  constructor(
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly activatedRoute: ActivatedRoute,
    private readonly cartService: CartService
  ) { }

  ngOnInit() {
    this.initMenuItemOptions();

    this.cartService.orderItems$.subscribe(data => console.log(data));
  }

  ngOnDestroy() {
    this.sourceSubscription.unsubscribe();
  }

  onClose() {
    this.activatedRoute.data.pipe(take(1)).subscribe(({ data: { queryParams: { categoryId } } }) => {
      const id = categoryId;

      this.router.navigate([NAVIGATE.ordering, LOCAL_ROUTING.menuCategoryItems, id], { skipLocationChange: true });
    });
  }

  scroll({ detail }) {
    this.isStaticHeader = detail.scrollTop === 0;
  }

  initForm(cartSelectedItems: OrderItem[] = []) {
    console.log(cartSelectedItems);
    const formGroup = {};
    if (!cartSelectedItems.length) {
      this.menuItem.menuItemOptions.forEach(({ menuGroup }) => {
        if (menuGroup.maximum === 1 && menuGroup.minimum === 1) {
          formGroup[menuGroup.name] = ['', [Validators.required]];
          return;
        }
        formGroup[menuGroup.name] = [
          [],
          [validateMinLengthOfArray(menuGroup.minimum), validateMaxLengthOfArray(menuGroup.maximum)],
        ];
      });
    } else {
      this.menuItem.menuItemOptions.forEach(({ menuGroup }) => {
        if (menuGroup.maximum === 1 && menuGroup.minimum === 1) {
          const selectedOption = menuGroup.menuGroupItems.find((someItem) => {
            const a = cartSelectedItems.find(({ menuItemId }) => menuItemId === someItem.menuItem.id)
            return a && someItem.menuItem.id === a.menuItemId;
          })

          debugger
          if (selectedOption) {
            formGroup[menuGroup.name] = [selectedOption, [Validators.required]];
            return;
          }
        }
        const selectedOptions = menuGroup.menuGroupItems.filter(({ menuItem }) => {
          const b = cartSelectedItems.find(({ menuItemId }) => menuItemId === menuItem.id);
          return b && menuItem.id === b.menuItemId;
        })

        if (selectedOptions.length) {
          formGroup[menuGroup.name] = [
            selectedOptions,
            [validateMinLengthOfArray(menuGroup.minimum), validateMaxLengthOfArray(menuGroup.maximum)],
          ];
        }
      });
    }

    console.log(formGroup);
    debugger
    this.itemOrderForm = this.fb.group({
      ...formGroup,
      message: ['', [Validators.minLength(1), Validators.maxLength(255)]],
    });

    this.valueChanges();
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

  onFormSubmit() {
    if (this.itemOrderForm.invalid) {
      this.errorState = true;
      return;
    }
    const menuItem = {
      menuItemId: this.menuItem.id,
      orderItemOptions: [],
      quantity: this.order.counter,
    };

    const arrayOfvalues: any[] = Object.values(this.itemOrderForm.value);
    arrayOfvalues.forEach(value => {
      if (typeof value === 'string') {
        return;
      }

      if (value.length) {
        value.forEach(elem => {
          menuItem.orderItemOptions.push({
            menuItemId: elem.id,
            orderItemOptions: [],
            quantity: menuItem.quantity,
          });
        });
        return;
      }

      if (value && value.id) {
        menuItem.orderItemOptions.push({
          menuItemId: value.id,
          orderItemOptions: [],
          quantity: menuItem.quantity,
        });
        return;
      }
    });

    this.cartService.addOrderItems(menuItem);
    this.cartService.validateOrder().subscribe(() => this.onClose(), () => console.log('invalid'));
  }

  private initMenuItemOptions() {
    zip(this.activatedRoute.data, this.cartService.orderItems$).subscribe(
      ([
        {
          data: {
            menuItem,
            queryParams: { orderItemId },
          },
        },
        orderItems,
      ]) => {
        this.menuItem = menuItem.menuItem;
        console.log(this.menuItem);

        // Temporary, while we don't have images:
        // '/assets/images/temp-merchant-photo.jpg'
        this.menuItemImg = '/assets/images/temp-merchant-photo.jpg';
        this.order = { ...this.order, totalPrice: this.menuItem.price };

        const cartSelectedItem = orderItems.find(item => item.id === orderItemId);
        const cartOrderItemOptions = cartSelectedItem ? cartSelectedItem.orderItemOptions : [];
        this.initForm(cartOrderItemOptions);
      }
    );
  }

  private valueChanges() {
    const subscription = this.itemOrderForm.valueChanges.subscribe(formValue => {
      const arrayOfvalues: any[] = Object.values(formValue);
      this.order = { ...this.order, optionsPrice: 0 };
      arrayOfvalues.map(value => {
        if (typeof value === 'string') {
          return;
        }

        if (value.length) {
          const optionPrice = value.reduce((total, { price }) => price + total, 0);
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
