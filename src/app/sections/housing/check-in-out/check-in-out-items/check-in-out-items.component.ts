import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '@core/service/toast/toast.service';
import { CheckInOut } from '../check-in-out.model';
import { CheckInOutStateService} from '../check-in-out-state.service';
import { hasDatePassed } from '@sections/housing/utils/has-date-passed';

@Component({
  selector: 'st-check-in-out-items',
  templateUrl: './check-in-out-items.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./check-in-out-items.component.scss'],
})
export class CheckInOutItemsComponent implements OnInit {
  @ViewChild('container') divContainer: ElementRef;
  @Input() checkInOuts: CheckInOut[]
  
  constructor(public checkInOutStateService: CheckInOutStateService,
              private _router: Router,
              private _activeRoute: ActivatedRoute,
              private _toastService: ToastService) { }

  ngOnInit() { }

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