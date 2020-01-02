import { Component, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { MerchantInfo } from '@sections/ordering/shared/models';

@Component({
  selector: 'st-merchant-item',
  templateUrl: './merchant-item.component.html',
  styleUrls: ['./merchant-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MerchantItemComponent {
  @Input() merchantInfo: MerchantInfo;
  @Output() merchantClick: EventEmitter<MerchantInfo> = new EventEmitter<MerchantInfo>();
  @Output() addToFav: EventEmitter<{ isFavorite: boolean; id: string }> = new EventEmitter<{
    isFavorite: boolean;
    id: string;
  }>();
  @Output() locationPin: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  get starClass(): string {
    const empty = 'star-outline';
    const filled = 'star-filled';
    const star = this.merchantInfo.isFavorite ? filled : empty;

    return `./assets/icon/${star}.svg`;
  }

  get orderTypes() {
    return this.merchantInfo.orderTypes;
  }

  getOrderTypes(): string {
    if (!this.orderTypes || (!this.orderTypes.delivery && !this.orderTypes.pickup)) {
      return '';
    }

    if (this.orderTypes.delivery && this.orderTypes.pickup) {
      return 'Pickup & Delivery';
    }

    return this.orderTypes.delivery ? 'Delivery' : 'Pickup';
  }

  triggerMerchantClick(merchantInfo) {
    this.merchantClick.emit(merchantInfo);
  }

  triggerFavourite(event, { isFavorite = null, id }: MerchantInfo) {
    this.addToFav.emit({ isFavorite, id });
    event.stopPropagation();
  }

  triggerLocationPin(event, id) {
    this.locationPin.emit(id);
    event.stopPropagation();
  }
}
