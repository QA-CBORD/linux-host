import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from '@core/service/loading/loading.service';
import { ApplicationsStateService } from '@sections/housing/applications/applications-state.service';
import { HousingService } from '@sections/housing/housing.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'st-roommate-search',
  templateUrl: './roommate-search.page.html',
  styleUrls: ['./roommate-search.page.scss'],
})
export class RoommateSearchPage implements OnInit, OnDestroy {
  searchBy: string;

  private subscriptions: Subscription = new Subscription();

  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _housingService: HousingService,
    private _loadingService: LoadingService,
    private _applicationStateService: ApplicationsStateService) { }

  ngOnInit() {
    const subscription = this._applicationStateService.roommateSearchOptions
      .subscribe(options => {
        this.searchBy = options.searchOptions;
      });
    this.subscriptions.add(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
