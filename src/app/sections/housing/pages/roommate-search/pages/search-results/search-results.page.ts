import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
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
  roommateSelecteds: RoommatePreferences[];
  private activeAlerts: HTMLIonAlertElement[] = [];
  private subscriptions: Subscription = new Subscription();
  private maximumPreferences: number;

  constructor(
    private _housingService: HousingService,
    private _loadingService: LoadingService,
    private _applicationService: ApplicationsService,
    private _applicationStateService: ApplicationsStateService,
    private _platform: Platform,
    private _alertController: AlertController,
    private _toastService: ToastService,
    private readonly cdRef: ChangeDetectorRef,
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
    this.roommateSelecteds = this._applicationStateService.roommatePreferencesSelecteds.map((value) => {
      if (value!=undefined){
        return value
      }
    } );
    this._loadingService.showSpinner();
    this.stillLoading$.next(true);
    this.roommateSearchOptions$ = this._applicationStateService.roommateSearchOptions.pipe(
      tap(data => {
        // eslint-disable-next-line no-prototype-builtins
        this.maximumPreferences = data.preferences.filter(res => res.hasOwnProperty('selected')  ).length
        this._applicationStateService.setMaximumSelectedRoommates(this.maximumPreferences)
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
    if(this.isMaximumRoommatePreferencesLength()){
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
                this._applicationService.selectRoommate(roommate)
                    .subscribe(status => {
                      if (status) {
                        alert.dismiss().then(() =>{ 
                          this._applicationStateService.setSubtractSelectedRoommates();
                          this._loadingService.closeSpinner()
                          this.cdRef.detectChanges()
                        } );
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
    }else {
      const alert2 = await this._alertController.create({
        header: 'Maximum number of roommates',
        message: `You added the maximum number of roommates`,
        buttons: [
          {
            text: 'Ok',
            role: 'cancel',
            cssClass: 'button__option_cancel',
            handler: () => {
              this.activeAlerts = [];
              alert2.dismiss();
            },
          }
        ],
      });
      this.activeAlerts.push(alert2);
      await alert2.present();
    }
  }
  
  getRoommatePreferencesSelecteds(): string {
    let options;
    this.roommateSearchOptions$.subscribe(res => options = res)
    const roommates = this.roommateSelecteds.map(res => {
      if (res.patronKeyRoommate !== 0) {
        this._applicationStateService.setSubtractSelectedRoommates();  
      }
      
      switch(options.showOptions){
        case 'preferredNameLast':{
          if(res.preferredName){
            return res.preferredName;
          }
          return res.firstName;
        }
        default:{
          return res.firstName
        }
      }
    })
    if(roommates[0] !== undefined  ) {
      return roommates.join()
    }
    return ''
  }

  isMaximumRoommatePreferencesLength(): boolean {
    return this._applicationStateService.maximumSelectedRoommates>0;
  }
}