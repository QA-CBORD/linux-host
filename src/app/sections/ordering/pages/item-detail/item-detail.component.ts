import { LOCAL_ROUTING } from '@sections/ordering/ordering.config';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NAVIGATE } from 'src/app/app.global';
import { zip, fromEvent } from 'rxjs';
import { CartService, MenuItemInfo } from '@sections/ordering';
import { take, map, startWith, distinctUntilChanged, shareReplay, tap } from 'rxjs/operators';

@Component({
  selector: 'st-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemDetailComponent implements OnInit {
  orderDetails = {
    itemName: 'French Frees',
    itemNDescription:
      "Whether you enjoy a slice as a snack or for breakfast, this bread is so flavorful, you won't need butter.",
    itemPrice: 6.99,
    size: [{ name: 'Small', price: null }, { name: 'Medium', price: '2.99' }, { name: 'Large', price: '4.99' }],
    toppings: [
      { name: 'Walnuts', price: null },
      { name: 'Ketchup', price: '1.00' },
      { name: 'Maple Syrup', price: null },
      { name: 'Whipped Cream', price: null },
      { name: 'Peanuts', price: null },
    ],
    nutritionsValue: {
      calories: 210,
      protein: 15,
      carbs: 5,
    },
  };

  itemOrderForm: FormGroup;
  checkedToppings = [];
  counter: number = 1;
  sizePrice: number = 0;
  toppingsPrice: number = 0;
  totalPrice: number = 0;



  menuItem: MenuItemInfo;
  constructor(
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly activatedRoute: ActivatedRoute,
    private readonly cartService: CartService
  ) { }

  ngOnInit() {
    this.initForm();

    zip(this.cartService.menuInfo$, this.activatedRoute.queryParams)
      .pipe(take(1))
      .subscribe(([menu, { categoryId, menuItemId }]) => {
        const menuCategory = menu.menuCategories.find(category => category.id === categoryId);
        const itemDetail = menuCategory.menuCategoryItems.find(category => category.id === menuItemId);
        this.menuItem = itemDetail.menuItem;

        console.log(this.menuItem.menuItemOptions);

      })

    // fromEvent(window, 'scroll').pipe(tap(x => console.log(x)))
    //   .subscribe(x => console.log(x));
  }

  get orderSize(): AbstractControl {
    return this.itemOrderForm.get(this.controlsNames.size);
  }

  get orderToppings(): AbstractControl {
    return this.itemOrderForm.get(this.controlsNames.toppings);
  }

  get orderMessage(): AbstractControl {
    return this.itemOrderForm.get(this.controlsNames.message);
  }

  get controlsNames() {
    return REQUEST_FUNDS_CONTROL_NAMES;
  }

  onClose() {
    this.activatedRoute.queryParams
      .pipe(take(1))
      .subscribe(({ categoryId }) => {
        const id = categoryId;

        this.router.navigate([NAVIGATE.ordering, LOCAL_ROUTING.menuCategoryItems, id], { skipLocationChange: true });
      })
  }

  calculateTotalPrice() {
    let toppingsSum: number = 0;

    if (this.checkedToppings.length > 0) {
      this.checkedToppings.forEach(v => {
        toppingsSum += Number(v.value.price)
        this.toppingsPrice = toppingsSum;
      });
    }

    const calcValue = (Number(this.sizePrice) + Number(this.toppingsPrice)) * this.counter;
    this.totalPrice = Number(calcValue.toFixed(2));
  }

  initForm() {
    this.itemOrderForm = this.fb.group({
      [this.controlsNames.size]: ['', [Validators.required]],
      [this.controlsNames.toppings]: [this.checkedToppings],
      [this.controlsNames.message]: ['', [Validators.maxLength(255)]],
    });
  }

  sizeChosen(size) {
    const { name, price } = size;
    const defaultPrice = this.orderDetails.itemPrice;

    switch (name) {
      case 'Small':
        this.sizePrice = defaultPrice;
        break;
      case 'Medium':
        this.sizePrice = Number(defaultPrice) + Number(price);
        break;
      case 'Large':
        this.sizePrice = Number(defaultPrice) + Number(price);
        break;
    }

    this.calculateTotalPrice();
  }

  toppingsChecked(topping) {
    //TODO: need to implement checkbox functional

    console.log(topping);
    console.log(this.checkedToppings);


    if (!this.checkedToppings.map(v => v.value.name).includes(topping.value.name)) {
      if (topping.checked && this.checkedToppings.length < 3) {
        this.checkedToppings.push(topping);
      }

    }

    this.calculateTotalPrice();
  }

  removeItems() {
    this.counter > 1 ? this.counter-- : null;
    this.calculateTotalPrice();
  }

  addItems() {
    this.counter++;
    this.calculateTotalPrice();
  }

  onFormSubmit() {
    if (this.itemOrderForm.valid) {
      const orderState = {
        amount: this.totalPrice,
        orderDetails: {
          size: this.orderSize.value,
          toppings: this.orderToppings.value,
          message: this.orderMessage.value,
        },
      };
      console.log(orderState);
    }
  }
}

export enum REQUEST_FUNDS_CONTROL_NAMES {
  size = 'size',
  toppings = 'toppings',
  message = 'message',
}
