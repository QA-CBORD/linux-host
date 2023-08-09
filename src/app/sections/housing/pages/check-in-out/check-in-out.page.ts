import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { LoadingService } from '@core/service/loading/loading.service';
import { CheckInOutStateService } from '@sections/housing/check-in-out/check-in-out-state.service';
import { CheckInOutSlot, CheckInOutSpot } from '@sections/housing/check-in-out/check-in-out.model';
import { HousingService } from '@sections/housing/housing.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { monthDayYear } from '../../../../shared/constants/dateFormats.constant';

@Component({
  selector: 'st-check-in-out',
  templateUrl: './check-in-out.page.html',
  styleUrls: ['./check-in-out.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckInOutPage implements OnInit {
  availableSlots: CheckInOutSpot[] = [];
  availableSlots$: Observable<CheckInOutSpot>;
  checkInOutKey: number;
  stillLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  dateFormat = monthDayYear;

  constructor(
    private _route: ActivatedRoute,
    private _loadingService: LoadingService,
    private _housingService: HousingService,
    private _checkInOutStateService: CheckInOutStateService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.checkInOutKey = +this._route.snapshot.params.checkInOutKey;
    this._initCheckInOutSlotsObservable();
  }

  private _initCheckInOutSlotsObservable(): void {
    this._loadingService.showSpinner();
    this.stillLoading$.next(true);
    this.availableSlots$ = this.getAllowedTimes();
  }

  showAvailableSpots(selectedSlot: CheckInOutSpot) {
    this._router.navigate(['patron/housing/check-in-out-spots/spots']).then(() => {
      this._checkInOutStateService.setActiveCheckInOutSlot(selectedSlot);
    });
  }

  private isAllowedDate(y: CheckInOutSlot, value: CheckInOutSlot): boolean {
    return (
      y.slotDateTime.getDate() === value.slotDateTime.getDate() &&
      y.slotDateTime.getMonth() === value.slotDateTime.getMonth() &&
      y.slotDateTime.getFullYear() === value.slotDateTime.getFullYear()
    );
  }

  private getAllowedTimes() {
    return this._housingService.getCheckInOutSlots(this.checkInOutKey).pipe(
      mergeMap(slots => {
        slots.forEach(value => {
          this.setAvailableSlots(value, slots);
        });

        this.stillLoading$.next(false);
        this.availableSlots = [...this.availableSlots].sort(
          (a, b) => a.slotDateTime.getTime() - b.slotDateTime.getTime()
        );
        this._loadingService.closeSpinner();
        return this.availableSlots;
      }),
      catchError((error: Error) => {
        this.stillLoading$.next(false);
        throw error;
      })
    );
  }

  private setAvailableSlots(value: CheckInOutSlot, slots: CheckInOutSlot[]) {
    const index = this.availableSlots.findIndex(y => y.slotDateTime.getDate() === value.slotDateTime.getDate());
    if (index === -1) {
      this.availableSlots.push({
        slotDateTime: value.slotDateTime,
        spots: slots.filter(y => this.isAllowedDate(y, value)).map(y => new CheckInOutSlot(y)),
      });
    }
  }
}
