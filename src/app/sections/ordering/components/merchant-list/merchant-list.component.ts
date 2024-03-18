import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

import { MerchantInfo } from '@sections/ordering/shared/models';

@Component({
  selector: 'st-merchant-list',
  templateUrl: './merchant-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MerchantListComponent {
  @Input() merchantList: MerchantInfo[];
  @Output() merchantClick: EventEmitter<MerchantInfo> = new EventEmitter<MerchantInfo>();
  @Output() addToFav: EventEmitter<{ isFavorite: boolean; id: string }> = new EventEmitter<{
    isFavorite: boolean;
    id: string;
  }>();

  trackMerchantsById(index: number, { id }: MerchantInfo): string {
    return id;
  }

  merchantClickHandler(merchantInfo) {
    this.merchantClick.emit(merchantInfo);
  }

  favouriteHandler({ isFavorite, id }) {
    this.addToFav.emit({ isFavorite, id });
  }
}
