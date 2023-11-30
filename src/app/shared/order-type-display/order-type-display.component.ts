import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderTypePipeModule } from '@sections/ordering/shared/pipes/order-type/order-type.module';
import { MerchantInfo } from '@sections/ordering';

@Component({
  selector: 'st-order-type-display',
  template: ` <span [class]="displayClass">{{ merchant | orderType : isAbleToOrder }}</span> `,
  standalone: true,
  imports: [CommonModule, OrderTypePipeModule],
  styleUrls: ['./order-type-display.component.scss'],
})
export class OrderTypeDisplayComponent {
  displayClass: string;
  merchant: MerchantInfo;
  @Input('merchant') set _merchant(merchantInfo: MerchantInfo) {
    this.merchant = merchantInfo;
    this.displayClass = 'order-type__main';
    if (merchantInfo.walkout) {
      this.displayClass = 'order-type__walkout';
    }
  }

  @Input() isAbleToOrder = true;
}
