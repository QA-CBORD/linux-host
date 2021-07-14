import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoadingService } from '@core/service/loading/loading.service';
import { ToastService } from '@core/service/toast/toast.service';
import { isMobile } from '@core/utils/platform-helper';
import { AlertController, Platform } from '@ionic/angular';
import { ApplicationsStateService } from '@sections/housing/applications/applications-state.service';
import { RoommateSearchOptions } from '@sections/housing/applications/applications.model';
import { ApplicationsService } from '@sections/housing/applications/applications.service';
import { HousingService } from '@sections/housing/housing.service';
import { RoommateDetails } from '@sections/housing/roommate/roomate.model';
import { BehaviorSubject, Observable, Subscription, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { RoommatePreferences } from '../../../../applications/applications.model';

@Component({
  selector: 'st-search-results',
  templateUrl: './search-results.page.html',
  styleUrls: ['./search-results.page.scss'],
})
export class SearchResultsPage implements OnInit, OnDestroy {
  roommateSearchOptions$: Observable<RoommateSearchOptions>;
  roommates$: Observable<RoommateDetails[]>;
  stillLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  roommateSelecteds: string;
  private activeAlerts: HTMLIonAlertElement[] = [];
  private subscriptions: Subscription = new Subscription();

  constructor(
    private _housingService: HousingService,
    private _loadingService: LoadingService,
    private _applicationService: ApplicationsService,
    private _applicationStateService: ApplicationsStateService,
    private _platform: Platform,
    private _alertController: AlertController,
    private _toastService: ToastService,
  ) { }

  ngOnInit() {
    if (isMobile(this._platform)) {
      this.subscriptions = this._platform.pause.subscribe(x => {
        this.activeAlerts.forEach(alert => {
          alert.dismiss();
        });
        this.activeAlerts = [];
      });
    }
    this.roommateSelecteds = this._applicationStateService.roommatePreferencesSelecteds.map(res => res.firstName ).join(' ,');
    this._loadingService.showSpinner();
    this.stillLoading$.next(true);
    this.roommateSearchOptions$ = this._applicationStateService.roommateSearchOptions.pipe(
      tap(data => {
        this.roommates$ = this._housingService.searchRoommates(data.searchOptions, data.searchValue).pipe(
          tap(_ => {
            this._loadingService.closeSpinner();
            this.stillLoading$.next(false);
          }),
          finalize(() => {
            this._loadingService.closeSpinner();
            this.stillLoading$.next(false);
          })
        );
      }),
      catchError((error: any) => {
        this.stillLoading$.next(false);
        this._loadingService.closeSpinner();
        return throwError(error);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  async selectRoommate(roommate: RoommateDetails): Promise<void> {
    const alert = await this._alertController.create({
      header: 'Confirm',
      message: `Are you sure you want to select ${roommate.firstName} ${roommate.lastName} as your roommate?`,
      buttons: [
        {
          text: 'NO',
          role: 'cancel',
          cssClass: 'button__option_cancel',
          handler: () => {
            this.activeAlerts = [];
            alert.dismiss();
          },
        },
        {
          text: 'YES',
          role: 'confirm',
          cssClass: 'button__option_confirm',
          handler: () => {
            this._loadingService.showSpinner();
            this.activeAlerts = [];

            const subs =
              this._applicationService.selectRoommate(roommate.patronKey,roommate.firstName)
                  .subscribe(status => {
                    if (status) {
                      // redirect to housing dashboard (terms page)
                      alert.dismiss().then(() => this._loadingService.closeSpinner());
                    } else {
                      alert.dismiss().then(() => {
                        this._loadingService.closeSpinner();
                        this._toastService.showToast({
                          message: 'This patron can not be selected as your roommate at the moment.',
                        });
                      });
                    }
                  });

            this.subscriptions.add(subs);
          },
        },
      ],
    });

    this.activeAlerts.push(alert);
    await alert.present();
  }
  
  getRoommatePreferencesSelecteds(): string {
    // return this.roommateSelecteds.map(res => res.firstName ).join(' ,')
    return ''
  }
}
