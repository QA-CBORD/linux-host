import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';

import { LoadingService } from '@core/service/loading/loading.service';
import { ToastService } from '@core/service/toast/toast.service';
import { CheckInOutStateService } from '@sections/housing/check-in-out/check-in-out-state.service';
import {
  CheckInOutSlot,
  CheckInOutSlot2
} from '@sections/housing/check-in-out/check-in-out.model';
import { HousingService } from '@sections/housing/housing.service';
import {
  Observable,
  of,
  throwError
} from 'rxjs';
import {
  catchError,
  flatMap,
  take,
  tap
} from 'rxjs/operators';

@Component({
  selector: 'st-check-in-out',
  templateUrl: './check-in-out.page.html',
  styleUrls: ['./check-in-out.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckInOutPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  
  checkInOutSlots$: Observable<CheckInOutSlot[]>;

  availableSlots: CheckInOutSlot2[] = [];
  availableSlots$: Observable<CheckInOutSlot2>;
  checkInOutKey: number;

  constructor(
    private _route: ActivatedRoute,
    private _loadingService: LoadingService,
    private _housingService: HousingService,
    private _toastService: ToastService,
    private _checkInOutStateService: CheckInOutStateService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.checkInOutKey = parseInt(this._route.snapshot.paramMap.get('checkInOutKey'), 10);
    this._initCheckInOutSlotsObservable();
  }

  private _initCheckInOutSlotsObservable(): void {
    this._loadingService.showSpinner();
    
    this.availableSlots$ = this._housingService.getCheckInOutSlots(this.checkInOutKey)
      .pipe(
        flatMap(data => {
          data.forEach(value => {
            const idx = this.availableSlots.findIndex(y => y.slotDateTime.getDate() === value.slotDateTime.getDate());
            
            if (idx === -1) {
              this.availableSlots.push({
                slotDateTime: value.slotDateTime,
                spots: data.filter(y => y.slotDateTime.getDate() === value.slotDateTime.getDate()).map(y => new CheckInOutSlot(y))
              });
            }
          });
          return this.availableSlots;
        }),
        tap((data) => {
          this._loadingService.closeSpinner();
        }),
        catchError((error: any) => {
          this._loadingService.closeSpinner();
          return throwError(error);
        })
      );
  }

  showAvailableSpots(selectedSlot: CheckInOutSlot2) {
    this._router.navigate(['patron/housing/check-in-out-spots/spots']).then(() => {
      this._checkInOutStateService.setActiveCheckInOutSlot(selectedSlot);
    });
  }

  showMoreSlots() {
    // const nextSlots = this.allCheckInOutSlots.slice(this.showingSlots, this.pageSize);
    // this.showingSlots += this.pageSize;
    // for (const slot of nextSlots) {
    //   this.availableSlots.push(slot);
    // }

    // console.log(this.availableSlots);
  }

  getNextSlots($event) {
    console.log('slots: ', $event);
    of($event)
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

    /*
    setTimeout(() => {
      console.log('loading more slots');
      this.showMoreSlots();
      event.target.complete();
    }, 500);
     */
  }

  disableScroll() {
    // return this.showingSlots == this.allCheckInOutSlots.length;
  }
}
