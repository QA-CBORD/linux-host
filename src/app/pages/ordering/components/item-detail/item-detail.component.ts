import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'st-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss'],
})

export class ItemDetailComponent implements OnInit {

  public data = {
    itemName: "French Frees",
    itemNDescription: "Whether you enjoy a slice as a snack or for breakfast, this bread is so flavorful, you won't need butter.",
    itemPrice: 6.99,
    size: [
      {name: 'Small', price: null},
      {name: 'Medium', price: "2.99"},
      {name: 'Large', price: "4.99"},
    ],
    toppings: [
      {name: "Walnuts", price: null},
      {name: "Ketchup", price: 0.99},
      {name: "Maple Syrup", price: null},
      {name: "Whipped Cream", price: null},
      {name: "Peanuts", price: null},
    ],
    nutritionsValue: 
      {
        calories: 210,
        protein: 15,
        carbs: 5,
      },
    
  }

  public required: boolean = true;

  constructor(
    public modalContr : ModalController,

    ) { }

  ngOnInit() {}

  public close() {
    this.modalContr.dismiss();
  }

  onRadioGroupChanged({value}) {
    console.log(value);
  }

}
