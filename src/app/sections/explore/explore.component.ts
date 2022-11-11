import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MerchantInfo } from '@sections/ordering';
import { EXPLORE_ROUTING } from '@sections/explore/explore.config';
import { ExploreService } from '@sections/explore/services/explore.service';
import { NavigationService } from '@shared/services/navigation.service';
import { APP_ROUTES } from '@sections/section.config';

@Component({
  selector: 'st-explore',
  templateUrl: './explore.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExploreComponent implements OnInit {
  merchant$: Observable<MerchantInfo[]>;
  constructor(
    private readonly exploreService: ExploreService,
    private readonly routingService: NavigationService
  ) {}

  ngOnInit() {
    this.merchant$ = this.exploreService.sortedMerchants$;
  }

  async onMerchantClicked(id: string) {
      await this.routingService.navigate([APP_ROUTES.explore, EXPLORE_ROUTING.merchantDetails, id]);
  }
}
