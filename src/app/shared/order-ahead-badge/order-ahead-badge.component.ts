import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MerchantInfo } from '@sections/ordering';
import { MerchantSettings } from '@sections/ordering/ordering.config';
import { StBadgeComponent } from '../badge/badge.component';

@Component({
  standalone: true,
  imports: [CommonModule, StBadgeComponent],
  selector: 'st-order-ahead-badge',
  template: `<st-badge *ngIf="isMerchantOrderAhead">Order Ahead Here</st-badge>`,
})
export class OrderAheadBadgeComponent {
  isMerchantOrderAhead = false;

  @Input() set merchant(merchantInfo: MerchantInfo) {
    this.isMerchantOrderAhead = parseInt(merchantInfo?.settings?.map[MerchantSettings.orderAheadEnabled].value) === 1;
  }
}
