import {
  AfterViewInit,
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

@Component({
  selector: 'st-check-in-out-items',
  templateUrl: './check-in-out-items.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./check-in-out-items.component.scss'],
})
export class CheckInOutItemsComponent implements OnInit, AfterViewInit {
  @ViewChild('container') divContainer: ElementRef;
  @Input() checkInOuts: CheckInOut[]
  
  constructor(public checkInOutStateService: CheckInOutStateService,
              private _router: Router,
              private _activeRoute: ActivatedRoute,
              private _toastService: ToastService) { }

  ngOnInit() { }

  ngAfterViewInit() {
      //helps load ionList that doesnt load unless an event is fired
    if(this.checkInOuts.length > 0)
      this.divContainer.nativeElement.click();
  }

  openCheckInOutSlots(key: any): void {
    const roomSelection: CheckInOut = this.checkInOuts.find(x => x.key === key);
    //if(hasDatePassed(roomSelection.accessTime) && !hasDatePassed(roomSelection.accessEnd)) {
    this._router.navigate(['patron/housing/check-in-out', key]);
    //}
    // else {
    //   this._toastService.showToast({message: 'Your access time has not been reached yet.'});
    // }
  }
}