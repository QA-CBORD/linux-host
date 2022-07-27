import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MerchantInfo } from '@sections/ordering';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';

@Component({
  selector: 'st-merchant-card',
  templateUrl: './merchant-card.component.html',
  styleUrls: ['./merchant-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MerchantCardComponent {
  @Input() merchant: MerchantInfo;

  constructor(private readonly environmentFacadeService: EnvironmentFacadeService) {}

  awsImageUrl: string = this.environmentFacadeService.getImageURL();
}
