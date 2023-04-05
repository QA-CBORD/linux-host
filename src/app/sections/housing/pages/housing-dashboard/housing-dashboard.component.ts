import { Component, ChangeDetectionStrategy, OnDestroy, OnInit } from '@angular/core';
import { Subscription, merge } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { LoadingService } from '@core/service/loading/loading.service';
import { HousingService } from '../../housing.service';

export enum SelectedHousingTab {
  Forms = 'Forms',
  Rooms = 'Rooms',
  Contracts = 'Contracts',
}

@Component({
  selector: 'st-housing-dashboard',
  templateUrl: './housing-dashboard.component.html',
  styleUrls: ['./housing-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HousingDashboardPage implements OnInit, OnDestroy {
  HousingTab = SelectedHousingTab;
  selectedHousingTab: string = SelectedHousingTab.Forms;
  private _subscription: Subscription = new Subscription();

  isHeaderVisible: boolean;
  hasRoomSelections: boolean;
  hasContracts: boolean;
  hasCheckInOuts: boolean;

  constructor(
    private _loadingService: LoadingService,
    private _housingService: HousingService
  ) {}

  ngOnInit(): void {
    this._retriveAllFormTypes();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  ionViewWillEnter() {
    this._housingService.refreshDefinitions();
  }

  private _retriveAllFormTypes(): void {
    this._subscription = this._housingService.refreshDefinitions$
      .pipe(
        switchMap((termId: number) => {
          this._loadingService.showSpinner();
          return merge(
            this._housingService.getDefinitions(termId),
            this._housingService.getRoomSelects(termId),
            this._housingService.getPatronContracts(termId),
            this._housingService.getCheckInOuts(termId),
            this._housingService.getInspections(termId),
            this._housingService.getAttachmentsListDetails(termId)
          );
        })
      )
      .subscribe({
        next: () => this._loadingService.closeSpinner(),
        error: () => this._loadingService.closeSpinner(),
      });
  }

  public changeView(view: string) {
    this.selectedHousingTab = view;
  }
}
