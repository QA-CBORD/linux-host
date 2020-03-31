import { Component, Input } from '@angular/core';
import { MerchantInfo } from '@sections/ordering';

@Component({
  selector: 'st-merchant-main-info',
  templateUrl: './merchant-main-info.component.html',
  styleUrls: ['./merchant-main-info.component.scss'],
})
export class MerchantMainInfoComponent {
  @Input() merchant: MerchantInfo;

}
