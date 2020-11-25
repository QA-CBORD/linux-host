import { Component, ChangeDetectionStrategy, OnDestroy, OnInit } from '@angular/core';
import { Subscription, merge } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { LoadingService } from '@core/service/loading/loading.service';
import { TermsService } from '../../terms/terms.service';
import { HousingService } from '../../housing.service';

import { DefinitionsResponse, RoomSelectResponse } from '../../housing.model';

@Component({
  selector: 'st-housing-dashboard',
  templateUrl: './housing-dashboard.page.html',
  styleUrls: ['./housing-dashboard.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HousingDashboardPage implements OnInit, OnDestroy {
  private _subscription: Subscription = new Subscription();

  isHeaderVisible: boolean = false;
  hasRoomSelections: boolean = false;

  constructor(
    private _termsService: TermsService,
    private _loadingService: LoadingService,
    private _housingService: HousingService
  ) {}

  ngOnInit(): void {
    this._initApplicationsSubscription();
    this._initRoomSelectsSubscription();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  private _initRoomSelectsSubscription(): void {
    const roomSelectSubscription: Subscription = merge(
      this._housingService.refreshDefinitions$,
      this._termsService.termId$
    )
      .pipe(
      switchMap((termId: number) => {
        return this._housingService.getRoomSelects(termId);
      })
    ).subscribe({
      next: (response: RoomSelectResponse) => this._handleSuccess(response),
      error: () => this._loadingService.closeSpinner(),
    });

    this._subscription.add(roomSelectSubscription);
  }

  private _initApplicationsSubscription(): void {
    const applicationsSubscription: Subscription = merge(
      this._housingService.refreshDefinitions$,
      this._termsService.termId$
    )
      .pipe(
        switchMap((termId: number) => {
          this._loadingService.showSpinner();

          return this._housingService.getDefinitions(termId);
        })
      )
      .subscribe({
        next: (response: DefinitionsResponse) => this._handleSuccess(response),
        error: () => this._loadingService.closeSpinner(),
      });

    this._subscription.add(applicationsSubscription);
  }

  private _handleSuccess(response: any): void {
    if(response instanceof DefinitionsResponse){
      this.isHeaderVisible = this.isHeaderVisible || response.applicationDefinitions.length > 0 || response.contractDetails.length > 0;
    }
    if(response instanceof RoomSelectResponse){
      this.isHeaderVisible = this.isHeaderVisible || response.roomSelects.length > 0;
      this.hasRoomSelections = response.roomSelects.length > 0 ? true:false;
    }
    this._loadingService.closeSpinner();
  }
}
