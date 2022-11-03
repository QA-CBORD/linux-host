import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { LoadingService } from '@core/service/loading/loading.service';
import { ToastService } from '@core/service/toast/toast.service';
import { AlertController } from '@ionic/angular';
import { ApplicationsStateService } from '@sections/housing/applications/applications-state.service';
import { RoommateSearchOptions } from '@sections/housing/applications/applications.model';
import { ApplicationsService } from '@sections/housing/applications/applications.service';
import { HousingService } from '@sections/housing/housing.service';
import { RoommateDetails } from '@sections/housing/roommate/roomate.model';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, switchMap, take, tap } from 'rxjs/operators';
import { RoommatePreferences } from '../../../../applications/applications.model';

@Component({
  selector: 'st-search-results',
  templateUrl: './search-results.page.html',
  styleUrls: ['./search-results.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchResultsPage implements OnInit {
  roommateSearchOptions$: Observable<RoommateSearchOptions>;
  roommates$: Observable<RoommateDetails[]>;
  stillLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  roommateSelecteds: RoommatePreferences[];
  private maximumPreferences: number;
  options: RoommateSearchOptions;

  constructor(
    private _housingService: HousingService,
    private _loadingService: LoadingService,
    private _applicationService: ApplicationsService,
    private _applicationStateService: ApplicationsStateService,
    private _alertController: AlertController,
    private _toastService: ToastService,
    private readonly cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.roommateSelecteds = this._applicationStateService.roommatePreferencesSelecteds.map(value => {
      if (value) {
        return value;
      }
    });
    this._loadingService.showSpinner();
    this.stillLoading$.next(true);
    this.roommateSearchOptions$ = this._applicationStateService.roommateSearchOptions.pipe(
      tap(roommates => {
        this.maximumPreferences = roommates.preferences.filter(res => res?.selected).length;
        this._applicationStateService.setMaximumSelectedRoommates(this.maximumPreferences);
      })
    );

    this.roommates$ = this.roommateSearchOptions$.pipe(
      switchMap(roommates => {
        this.options = roommates;
        return this._housingService.searchRoommates(roommates.searchOptions, roommates.searchValue);
      }),
      tap(() => this._loadingService.closeSpinner()),
      catchError(() => {
        this.notLoading();
        return of(null);
      })
    );
  }

  async selectRoommate(roommate: RoommateDetails): Promise<void> {
    if (this.hasRoommatePreference()) {
      const selectionAlert = await this._alertController.create({
        header: 'Confirm',
        message: `Are you sure you want to select ${roommate.firstName} ${roommate.lastName} as your roommate?`,
        buttons: [
          {
            text: 'NO',
            role: 'cancel',
            cssClass: 'button__option_cancel',
            handler: () => {
              selectionAlert.dismiss();
            },
          },
          {
            text: 'YES',
            role: 'confirm',
            cssClass: 'button__option_confirm',
            handler: () => {
              this.onRoommateSelected(roommate, selectionAlert);
            },
          },
        ],
      });
      await selectionAlert.present();
    } else {
      const confirmationAlert = await this._alertController.create({
        header: 'Maximum number of roommates',
        message: `You added the maximum number of roommates`,
        buttons: [
          {
            text: 'Ok',
            role: 'cancel',
            cssClass: 'button__option_cancel',
            handler: () => {
              confirmationAlert.dismiss();
            },
          },
        ],
      });
      await confirmationAlert.present();
    }
  }

  getRoommatePreferencesSelecteds(): string {
    let roommates;
    this.roommateSearchOptions$.pipe(take(1)).subscribe(options => {
      roommates = this.roommateSelecteds.map(res => {
        if (res.patronKeyRoommate > 0) {
          this._applicationStateService.setSubtractSelectedRoommates();
        }

        if (options.showOptions == 'preferredNameLast' && res.preferredName) {
          return res.preferredName;
        } else {
          return res.firstName;
        }
      });
    });
    
    if (roommates && roommates[0]) {
      return roommates.join();
    }
  }

  hasRoommatePreference(): boolean {
    return this._applicationStateService.maximumSelectedRoommates > 0;
  }

  private notLoading() {
    this.stillLoading$.next(false);
    this._loadingService.closeSpinner();
  }

  private onRoommateSelected(roommate: RoommateDetails, selectionAlert: HTMLIonAlertElement) {
    this._loadingService.showSpinner();
    this._applicationService
      .selectRoommate(roommate)
      .pipe(take(1))
      .subscribe(status => {
        selectionAlert.dismiss().then(() => {
          if (status) {
            this._applicationStateService.setSubtractSelectedRoommates();
            this.cdRef.detectChanges();
          } else {
            this._toastService.showToast({
              message: 'This patron can not be selected as your roommate at the moment.',
            });
          }
          this._loadingService.closeSpinner();
        });
      });
   }
}