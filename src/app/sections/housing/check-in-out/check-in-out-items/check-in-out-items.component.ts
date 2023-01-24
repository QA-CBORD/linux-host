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
import { CheckInOutStateService} from '../check-in-out-state.service';
import { hasDatePassed } from '@sections/housing/utils/has-date-passed';
import {monthNameDayYear, hourMin} from '../../../../shared/constants/dateFormats.constant'

@Component({
  selector: 'st-check-in-out-items',
  templateUrl: './check-in-out-items.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./check-in-out-items.component.scss'],
})
export class CheckInOutItemsComponent {
  @ViewChild('container') divContainer: ElementRef;
  @Input() checkInOuts: CheckInOut[]
  dateFormat = monthNameDayYear;
  timeFormat = hourMin

  constructor(public checkInOutStateService: CheckInOutStateService,
              private _router: Router,
              private _toastService: ToastService) { }

  openCheckInOutSlots(key: any): void {
    const checkInOut: CheckInOut = this.checkInOuts.find(x => x.key === key);
    if(hasDatePassed(checkInOut.availableStartDate) && !hasDatePassed(checkInOut.availableEndDate)) {
      this._router.navigate(['patron/housing/check-in-out', key]);
    }
    else {
      this._toastService.showToast({message: 'Your access time has not been reached yet.'});
    }
  }
}