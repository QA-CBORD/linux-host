import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MerchantInfo } from '@sections/ordering';
import { Environment } from '../../../../../environment';

@Component({
  selector: 'st-merchant-card',
  templateUrl: './merchant-card.component.html',
  styleUrls: ['./merchant-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MerchantCardComponent {
  @Input() merchant: MerchantInfo;
  awsImageUrl: string = Environment.getImageURL();
}
