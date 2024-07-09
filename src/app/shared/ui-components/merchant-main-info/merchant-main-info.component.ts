import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { MerchantInfo } from '@sections/ordering';
import { OrderTypePipeModule } from '@sections/ordering/shared/pipes/order-type/order-type.module';
import { OrderAheadBadgeComponent } from '@shared/order-ahead-badge/order-ahead-badge.component';
import { OrderTypeDisplayComponent } from '@shared/order-type-display/order-type-display.component';
import { MerchantDistanceModule } from '@shared/pipes/merchant-distance/merchant-distance.module';

@Component({
  selector: 'st-merchant-main-info',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    MerchantDistanceModule,
    OrderTypePipeModule,
    OrderAheadBadgeComponent,
    OrderTypeDisplayComponent,
    TranslateModule,
  ],
  templateUrl: './merchant-main-info.component.html',
  styleUrls: ['./merchant-main-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MerchantMainInfoComponent {
  @Input() isShowOrderType = true;
  @Input() isWalkOut = false;
  @Input() isShowMerchantStatus = true;
  @Input() merchant: MerchantInfo;
  @Input() headingMode: 'card' | 'title' = 'card';
}
