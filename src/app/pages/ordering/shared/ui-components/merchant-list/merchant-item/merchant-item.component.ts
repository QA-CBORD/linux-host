import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { MerchantInfo } from './../../../../models/merchant-info';

@Component({
  selector: 'st-merchant-item',
  templateUrl: './merchant-item.component.html',
  styleUrls: ['./merchant-item.component.scss'],
})
export class MerchantItemComponent implements OnInit {
  @Input() merchantInfo: MerchantInfo;
  @Output() addToFav: EventEmitter<string> = new EventEmitter<string>();
  @Output() locationPin: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  get starClass(): string {
    const empty = 'star-outline';
    const filled = 'star-filled';
    const star = this.merchantInfo.isFavorite ? filled : empty;

    return `./assets/icon/${star}.svg`;
  }

  itemClickTest(){
    console.log("Click TEst");
    
  }

  /// there is a better way, this is temporary (Oleksii, Oleh)
  getOrderTypes(): string {
    if (!this.merchantInfo.orderTypes) {
      return '';
    }

    if (this.merchantInfo.orderTypes.pickup) {
      if (this.merchantInfo.orderTypes.delivery) {
        return 'PICKUP & DELIVERY';
      }
      return 'PICKUP';
    } else if (this.merchantInfo.orderTypes.delivery) {
      return 'DELIVERY';
    }

    return '';
  }

  triggerFavourite() {
    this.addToFav.emit(this.merchantInfo.id);
  }

  triggerLocationPin() {
    this.locationPin.emit(this.merchantInfo.id);
  }
}
