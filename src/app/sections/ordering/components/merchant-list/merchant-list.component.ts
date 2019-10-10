import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

import { MerchantInfo } from '@sections/ordering/shared/models';

@Component({
  selector: 'st-merchant-list',
  templateUrl: './merchant-list.component.html',
  styleUrls: ['./merchant-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MerchantListComponent {
  @Input() merchantList: MerchantInfo[];
  @Output() merchantClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() addToFav: EventEmitter<{ isFavorite: boolean; id: string }> = new EventEmitter<{
    isFavorite: boolean;
    id: string;
  }>();
  @Output() locationPin: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  trackMerchantsById(index: number, { id }: MerchantInfo): string {
    return id;
  }

  merchantClickHandler({ id, orderTypes, storeAddress }) {
    this.merchantClick.emit({ id, orderTypes });
  }

  favouriteHandler({ isFavorite, id }) {
    this.addToFav.emit({ isFavorite, id });
  }

  locationPinHandler(id: string) {
    this.locationPin.emit(id);
  }
}
