import { Component, ChangeDetectionStrategy, OnDestroy, OnInit } from '@angular/core';
import { Subscription, merge } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { LoadingService } from '@core/service/loading/loading.service';
import { TermsService } from '../../terms/terms.service';
import { HousingService } from '../../housing.service';

import { CheckInOutResponse, ContractListResponse, DefinitionsResponse, RoomSelectResponse } from '../../housing.model';

export enum SelectedHousingTab { Forms, Rooms, Contracts }

@Component({
  selector: 'st-housing-dashboard',
  templateUrl: './housing-dashboard.page.html',
  styleUrls: ['./housing-dashboard.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HousingDashboardPage implements OnInit, OnDestroy {
  SelectedHousingTab = SelectedHousingTab; // needed to reference enum on front-end
  _selectedHousingTab: SelectedHousingTab = SelectedHousingTab.Forms;
  private _subscription: Subscription = new Subscription();

  isHeaderVisible = false;
  hasRoomSelections = false;
  hasContracts = false;
  hasCheckInOuts = false;

  constructor(
    private _termsService: TermsService,
    private _loadingService: LoadingService,
    private _housingService: HousingService
  ) {}

  ngOnInit(): void {
    this._initSubscription()
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  private _initSubscription(): void {
    const dashboardSubscription: Subscription = merge(
      this._housingService.refreshDefinitions$,
      this._termsService.termId$
    )
      .pipe(
        switchMap((termId: number) => {
          this._loadingService.showSpinner();
          return merge(
            this._housingService.getDefinitions(termId),
            this._housingService.getRoomSelects(termId),
            this._housingService.getPatronContracts(termId),
            this._housingService.getCheckInOuts(termId),
            this._housingService.getInspections(termId)
          )
        })
      )
      .subscribe({
        next: (response: DefinitionsResponse) => this._handleSuccess(response),
        error: () => this._loadingService.closeSpinner(),
      });
      
    this._subscription.add(dashboardSubscription);
  }

  private _handleSuccess(response: any): void {
    if(response instanceof DefinitionsResponse){
      this.isHeaderVisible = this.isHeaderVisible || response.applicationDefinitions.length > 0 || response.contractDetails.length > 0;
    }
    if(response instanceof RoomSelectResponse){
      this.isHeaderVisible = this.isHeaderVisible || response.roomSelects.length > 0;
      this.hasRoomSelections = response.roomSelects.length > 0 ? true:false;
    }
    if(response instanceof ContractListResponse){
      this.isHeaderVisible = this.isHeaderVisible || response.contractSummaries.length > 0;
      this.hasContracts = response.contractSummaries.length > 0 ? true:false;
    }
    if(response instanceof CheckInOutResponse){
      this.isHeaderVisible = this.isHeaderVisible || response.checkInOuts.length > 0;
      this.hasCheckInOuts = response.checkInOuts.length > 0 ? true:false;
    }
    // if(response ){
    //   //TODO: handleSuccess
    //   this.isHeaderVisible = this.isHeaderVisible || response.checkInOuts.length > 0;
    //   this.hasCheckInOuts = response.checkInOuts.length > 0 ? true:false;
    // }
    this._loadingService.closeSpinner();
  }
}
