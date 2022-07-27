import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MerchantInfo } from '@sections/ordering';
import { environmentFacadeService } from '@core/facades/environment/environment.facade.service';

@Component({
  selector: 'st-merchant-card',
  templateUrl: './merchant-card.component.html',
  styleUrls: ['./merchant-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MerchantCardComponent {
  @Input() merchant: MerchantInfo;

  constructor(private readonly environmentFacadeService: environmentFacadeService) {}

  awsImageUrl: string = this.environmentFacadeService.getImageURL();
}
