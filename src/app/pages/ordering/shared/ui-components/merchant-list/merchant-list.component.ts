import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { MerchantInfo } from '../../../models/merchant-info';

@Component({
  selector: 'st-merchant-list',
  templateUrl: './merchant-list.component.html',
  styleUrls: ['./merchant-list.component.scss'],
})
export class MerchantListComponent implements OnInit {

  @Input() merchantList: MerchantInfo[];
  @Output('favouriteTrigger') favouriteTrigger: EventEmitter<string> = new EventEmitter<string>();
  constructor() {}

  ngOnInit() {}


  trackMerchantsById(index: number, { id }: MerchantInfo): string {
    return id;
  }

  favouriteHandler(event: string) {
    this.favouriteTrigger.emit(event);
  }

}
