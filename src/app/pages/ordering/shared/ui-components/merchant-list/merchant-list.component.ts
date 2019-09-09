import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { MerchantInfo } from '../../models';

@Component({
  selector: 'st-merchant-list',
  templateUrl: './merchant-list.component.html',
  styleUrls: ['./merchant-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MerchantListComponent {
  @Input() merchantList: MerchantInfo[];
  @Output('favouriteTrigger') favouriteTrigger: EventEmitter<string> = new EventEmitter<string>();
  @Output('locationPinTrigger') locationPinTrigger: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  trackMerchantsById(index: number, { id }: MerchantInfo): string {
    return id;
  }

  favouriteHandler(event: string) {
    this.favouriteTrigger.emit(event);
  }

  locationPinHandler(event: string){
    this.locationPinTrigger.emit(event);
  }

}
