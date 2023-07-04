import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewChild
} from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '@core/service/toast/toast.service';
import { CheckInOut } from '../check-in-out.model';
import { CheckInOutStateService } from '../check-in-out-state.service';
import { hasDatePassed } from '@sections/housing/utils/has-date-passed';
import { monthDayYear, hourMinTime } from '@shared/constants/dateFormats.constant'
import { ToastMsg } from '@shared/constants/toastMessages.constant';

@Component({
  selector: 'st-check-in-out-items',
  templateUrl: './check-in-out-items.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./check-in-out-items.component.scss'],
})
export class CheckInOutItemsComponent {
  @ViewChild('container') divContainer: ElementRef;
  @Input() checkInOuts: CheckInOut[]
  dateFormat = monthDayYear;
  timeFormat = hourMinTime;


  constructor(public checkInOutStateService: CheckInOutStateService,
              private _router: Router,
              private _toastService: ToastService) { }

  openCheckInOutSlots(key: number): void {
    const checkInOut: CheckInOut = this.checkInOuts.find(x => x.key === key);
    if (hasDatePassed(checkInOut.availableStartDate) && !hasDatePassed(checkInOut.availableEndDate)) {
      this._router.navigate(['patron/housing/check-in-out', key]);
    }
    else {
      this._toastService.showToast({ message: ToastMsg.EXPIREDTIME });
    }
  }


}
