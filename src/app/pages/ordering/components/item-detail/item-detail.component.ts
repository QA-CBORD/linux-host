import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'st-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss'],
})

export class ItemDetailComponent implements OnInit {

  
  orderDetails = {
    itemName: "French Frees",
    itemNDescription: "Whether you enjoy a slice as a snack or for breakfast, this bread is so flavorful, you won't need butter.",
    itemPrice: 6.99,
    size: [
      {name: 'Small', price: null},
      {name: 'Medium', price: "2.99"},
      {name: 'Large', price: "4.99"}
    ],
    toppings: [
      {name: "Walnuts", price: null},
      {name: "Ketchup", price: "1.00"},
      {name: "Maple Syrup", price: null},
      {name: "Whipped Cream", price: null},
      {name: "Peanuts", price: null}
    ],
    nutritionsValue: 
      {
        calories: 210,
        protein: 15,
        carbs: 5
      }
  }

  itemOrderForm: FormGroup;
  checkedToppings = [];
  counter: number = 1;
  sizePrice = 0;
  toppingPrice = 0;
  totalPrice: number = 0; 

  constructor(
    private readonly modalContr : ModalController,
    private readonly fb: FormBuilder
    ) { }

  ngOnInit() {
    this.initForm();
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

  close() {
    this.modalContr.dismiss();
  }

  calculate() {
    let calcValue =(Number(this.sizePrice) + Number(this.toppingPrice))*this.counter;
    return this.totalPrice = Number(calcValue.toFixed(2));
  }

  initForm() {
    this.itemOrderForm = this.fb.group({
      [this.controlsNames.size]: ['', [Validators.required]],
      [this.controlsNames.toppings]: [this.checkedToppings],
      [this.controlsNames.message]: ['', [Validators.maxLength(255)]]
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
    };
    
    this.calculate();
  }

  checked(topping) {
    console.log(topping);
    console.log(this.checkedToppings);

    if(this.checkedToppings.map( v => v.checked).includes('false')) {
      console.log("hello");
      
    }

    if (this.checkedToppings.length < 3) {
      if(!this.checkedToppings.map( v => v.value.name).includes(topping.value.name)){
        if(this.checkedToppings.filter( v => v.checked === true)) {
          this.checkedToppings.push(topping);
        }
      }
    }     
        

  }
  
  removeItems() {
    this.counter > 1? this.counter-- : null;
    this.calculate();
  }

  addItems() {
    this.counter++;
    this.calculate();
  }

  onFormSubmit() {
    if (this.itemOrderForm.valid) {
      const orderState = {
        amount: this.totalPrice,
        orderDetails: {
          size: this.orderSize.value,
          toppings: this.orderToppings.value,
          message: this.orderMessage.value
         }
      }
      console.log(orderState);
    }
  }

}

export enum REQUEST_FUNDS_CONTROL_NAMES {
  size = 'size',
  toppings = 'toppings',
  message = 'message'
}
