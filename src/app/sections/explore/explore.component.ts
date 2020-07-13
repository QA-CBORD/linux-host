import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MerchantInfo } from '@sections/ordering';
import { Router } from '@angular/router';
import { EXPLORE_ROUTING } from '@sections/explore/explore.config';
import { PATRON_NAVIGATION } from '../../app.global';
import { ExploreService } from '@sections/explore/services/explore.service';

@Component({
  selector: 'st-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExploreComponent implements OnInit {
  merchant$: Observable<MerchantInfo[]>;

  constructor(private readonly exploreService: ExploreService, private readonly router: Router) {}

  ngOnInit() {
    this.merchant$ = this.exploreService.sortedMerchants$;
  }

  async onMerchantClicked(id: string) {
    await this.router.navigate([PATRON_NAVIGATION.explore, EXPLORE_ROUTING.merchantDetails, id]);
  }
}
