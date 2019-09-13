import { Component, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';

import { MerchantInfo } from '../../../models';

@Component({
  selector: 'st-merchant-item',
  templateUrl: './merchant-item.component.html',
  styleUrls: ['./merchant-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MerchantItemComponent {
  @Input() merchantInfo: MerchantInfo;
  @Output() merchantClick: EventEmitter<string> = new EventEmitter<string>();
  @Output() addToFav: EventEmitter<string> = new EventEmitter<string>();
  @Output() locationPin: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

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

  triggerMerchantClick() {
    this.merchantClick.emit(this.merchantInfo.id);
  }

  triggerFavourite() {
    this.addToFav.emit(this.merchantInfo.id);
  }

  triggerLocationPin() {
    this.locationPin.emit(this.merchantInfo.id);
  }
}
