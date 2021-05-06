import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from '@core/service/loading/loading.service';
import { ToastService } from '@core/service/toast/toast.service';
import { isMobile } from '@core/utils/platform-helper';
import { AlertController, IonInfiniteScroll, Platform } from '@ionic/angular';
import { CheckInOutStateService } from '@sections/housing/check-in-out/check-in-out-state.service';
import { CheckInOutSlot } from '@sections/housing/check-in-out/check-in-out.model';
import { CheckInOutService } from '@sections/housing/check-in-out/check-in-out.service';
import { CheckInOutSlotResponse } from '@sections/housing/housing.model';
import { HousingService } from '@sections/housing/housing.service';
import { Observable, of, Subscription, throwError } from 'rxjs';
import { catchError, scan, take, tap } from 'rxjs/operators';

@Component({
  selector: 'st-check-in-out',
  templateUrl: './check-in-out.page.html',
  styleUrls: ['./check-in-out.page.scss'],
})
export class CheckInOutPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  
  private subscriptions: Subscription = new Subscription();
  private activeAlerts: HTMLIonAlertElement[] = [];
  
  checkInOutSlots$: Observable<CheckInOutSlot[]>;

  checkInOutKey: number;

  constructor(
    private _platform: Platform,
    private _alertController: AlertController,
    private _route: ActivatedRoute,
    private _checkInOutService: CheckInOutService,
    // private _toasController: ToastController,
    private _loadingService: LoadingService,
    private _housingService: HousingService,
    private _toastService: ToastService,
    private _checkInOutStateService: CheckInOutStateService
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

    this.checkInOutKey = parseInt(this._route.snapshot.paramMap.get('checkInOutKey'), 10);
    this._initCheckInOutSlotsObservable();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private _initCheckInOutSlotsObservable(): void {
    this._loadingService.showSpinner();
    
    this.checkInOutSlots$ = this._housingService.getCheckInOutSlots(this.checkInOutKey)
      .pipe(
        tap((slots: CheckInOutSlot[]) => {
          this._loadingService.closeSpinner();
          console.log('slots: ', slots);
        }),
        catchError((error: any) => {
          this._loadingService.closeSpinner();
          return throwError(error);
        })
      );
  }

  getNextSlots(slots) {
    console.log('slots: ', slots);
    of(slots)
    .pipe(take(10))
    .subscribe(
      async data => (this.infiniteScroll.disabled = !data.length),
      async () => {},
      async () => await this.infiniteScroll.complete()
    );
    // this._checkInOutService
    //   .getNextTransactionsByAccountId(this.currentAccountId)
    //   .pipe(take(10))
    //   .subscribe(
    //     async data => (this.lazy.disabled = !data.length),
    //     async () => {
    //       await this.onErrorRetrieveTransactions('Something went wrong, please try again...');
    //       await this.content.scrollByPoint(null, -100, 700);
    //     },
    //     async () => await this.lazy.complete()
    //   );
  }
}
