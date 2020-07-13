import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MerchantInfo } from '@sections/ordering';

@Component({
  selector: 'st-merchant-main-info',
  templateUrl: './merchant-main-info.component.html',
  styleUrls: ['./merchant-main-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MerchantMainInfoComponent {
  @Input() isShowOrderType: boolean = true;
  @Input() isShowMerchantStatus: boolean = true;
  @Input() merchant: MerchantInfo;

}
