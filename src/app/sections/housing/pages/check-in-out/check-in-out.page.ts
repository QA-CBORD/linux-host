import {
  ChangeDetectionStrategy,
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';

import { LoadingService } from '@core/service/loading/loading.service';
import { CheckInOutStateService } from '@sections/housing/check-in-out/check-in-out-state.service';
import {
  CheckInOutSlot,
  CheckInOutSpot
} from '@sections/housing/check-in-out/check-in-out.model';
import { HousingService } from '@sections/housing/housing.service';
import {
  Observable,
  throwError
} from 'rxjs';
import {
  catchError,
  flatMap,
  tap
} from 'rxjs/operators';

@Component({
  selector: 'st-check-in-out',
  templateUrl: './check-in-out.page.html',
  styleUrls: ['./check-in-out.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckInOutPage implements OnInit {  
  checkInOutSlots$: Observable<CheckInOutSlot[]>;

  availableSlots: CheckInOutSpot[] = [];
  availableSlots$: Observable<CheckInOutSpot>;
  checkInOutKey: number;

  constructor(
    private _route: ActivatedRoute,
    private _loadingService: LoadingService,
    private _housingService: HousingService,
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

  showAvailableSpots(selectedSlot: CheckInOutSpot) {
    this._router.navigate(['patron/housing/check-in-out-spots/spots']).then(() => {
      this._checkInOutStateService.setActiveCheckInOutSlot(selectedSlot);
    });
  }
}