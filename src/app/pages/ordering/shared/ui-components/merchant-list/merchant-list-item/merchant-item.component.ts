import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';

import { MerchantInfo } from './../../../../models/merchant-info';

@Component({
  selector: 'st-merchant-item',
  templateUrl: './merchant-item.component.html',
  styleUrls: ['./merchant-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MerchantItemComponent implements OnInit {
  @Input() merchantInfo: MerchantInfo;
  @Output() addToFav: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  get starClass(): string {
    const empty = 'star-outline';
    const filled = 'star-filled';
    const star = this.merchantInfo.isFavorite ? filled : empty;

    return `./assets/icon/${star}.svg`;
  }

  triggerFavourite() {
    this.addToFav.emit(this.merchantInfo.id);
  }
}
