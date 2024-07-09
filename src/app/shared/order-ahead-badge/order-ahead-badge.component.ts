import { CommonModule } from '@angular/common';
import { Component, input, Input } from '@angular/core';
import { MerchantInfo } from '@sections/ordering';
import { MerchantSettings } from '@sections/ordering/ordering.config';
import { StBadgeComponent } from '../badge/badge.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  imports: [CommonModule, TranslateModule, StBadgeComponent],
  selector: 'st-order-ahead-badge',
  template: `<st-badge *ngIf="isMerchantOrderAhead && isAbleToOrder()">{{
    'patron-ui.ordering.order_ahead_here' | translate
  }}</st-badge>`,
})
export class OrderAheadBadgeComponent {
  isMerchantOrderAhead = false;

  isAbleToOrder = input(true);
  @Input() set merchant(merchantInfo: MerchantInfo) {
    this.isMerchantOrderAhead = parseInt(merchantInfo?.settings?.map[MerchantSettings.orderAheadEnabled]?.value) === 1;
  }
}
