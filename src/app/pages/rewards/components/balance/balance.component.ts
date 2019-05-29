import { Component, Input } from '@angular/core';
import { RewardsService } from '../../services';
import { CONTENT_STRINGS } from '../../rewards.config';

@Component({
  selector: 'st-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss'],
})
export class BalanceComponent {
  @Input() points: number;
  contentString: { [key: string]: string };

  constructor(private rewardsService: RewardsService) {
    this.initContentStrings();
  }

  private initContentStrings() {
    let balanceTitle = this.rewardsService.getContentValueByName(CONTENT_STRINGS.balanceLabel);
    let pointsLabel = this.rewardsService.getContentValueByName(CONTENT_STRINGS.pointsLabel);

    balanceTitle = balanceTitle ? balanceTitle : '';
    pointsLabel = pointsLabel ? pointsLabel : '';

    this.contentString = { balanceTitle, pointsLabel };
  }
}
